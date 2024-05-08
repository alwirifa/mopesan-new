"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Banners = {
  id: number;
  banner_name: string;
  description: string;
  banner_image: string;
};

const page = ({ params }: { params: { id: string } }) => {
  const [banners, setbanners] = useState<Banners | null>(null);

  useEffect(() => {
    const fetchbanners = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          throw new Error("Admin token not found");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        setbanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchbanners();
  }, []);

  if (!banners) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <img src={banners.banner_image} alt="" />
      <p>{banners.banner_name}</p>
      <p>{banners.description}</p>
    </div>
  );
};

export default page;
