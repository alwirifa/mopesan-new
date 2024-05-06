"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Menu = {
  order_day: string;
  total_order: number;
};

const page = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil token dari local storage
        const adminToken = localStorage.getItem("admin_token");

        if (adminToken) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/weekly-stats`,
            {
              headers: {
                Authorization: `Bearer ${adminToken}` // Menambahkan token ke header Authorization
              }
            }
          );
          const { data } = response.data;
          console.log("Search results:", data);
          setMenus(data);
        } else {
          console.error("Admin token not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <div>
      {/* Menampilkan data sesuai kebutuhan */}
    </div>
  );
};

export default page;
