"use client";

import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";


interface Menu {
  order_day: string;
  total_earnings: number;
}

interface ServerResponse {
  data: Menu[];
}

const MerchantBar = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem("admin_token");

        if (adminToken) {
          const response: AxiosResponse<ServerResponse> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/weekly-stats`,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );
          const { data } = response.data;

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
    <div className="bg-white rounded-md p-6 w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Merchants</h1>
        <p className="italic text-xs underline text-maroon">View All</p>
      </div>

      {/* card */}
      <div className="mt-6 flex flex-col gap-4">
        <div className=" border border-grayBorder rounded-md p-4 w-full flex flex-start justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <img
              src="/icons/kokurukIcon.png"
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <p className="capitalize text-lg font-semibold">Kokuruk Kemang</p>
          </div>
          <div className="text-textGreen bg-buttonGreen px-4 py-2 rounded-full text-sm">
            Open
          </div>
        </div>

        <div className=" border border-grayBorder rounded-md p-4 w-full flex flex-start justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <img
              src="/icons/kokurukIcon.png"
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <p className="capitalize text-lg font-semibold">Kokuruk Kemang</p>
          </div>
          <div className="text-textGreen bg-buttonGreen px-4 py-2 rounded-full text-sm">
            Open
          </div>
        </div>

        <div className=" border border-grayBorder rounded-md p-4 w-full flex flex-start justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <img
              src="/icons/kokurukIcon.png"
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <p className="capitalize text-lg font-semibold">Kokuruk Kemang</p>
          </div>
          <div className="text-textGreen bg-buttonGreen px-4 py-2 rounded-full text-sm">
            Open
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantBar;
