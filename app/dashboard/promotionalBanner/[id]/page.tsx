"use client";

import { deleteBanner, getBannerByID } from "@/app/lib/actions/bannerActions";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Banners = {
  id: number;
  banner_name: string;
  description: string;
  banner_image: string;
};

const page = ({ params }: { params: { id: string } }) => {
  const [banners, setbanners] = useState<any>(null);

  useEffect(() => {
    if (params && params.id) {
      getBannerByID(params.id)
        .then((data) => {
          setbanners(data);
          console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    }
  }, [params]);

  if (!banners) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <img src={banners.banner_image} alt="" />
      <p>{banners.banner_name}</p>
      <p>{banners.description}</p>
      <Link href={`/dashboard/promotionalBanner/edit/${banners.id}`}>EDIT</Link>
      <button onClick={() => deleteBanner(String(banners.id))}>DELETE</button>
    </div>
  );
};

export default page;
