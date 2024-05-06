"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Menu = {
  id: number;
  product_name: string;
  price: number;
  description: string;
  product_code: string;
  product_image: string;
  customization_keys: string[];
};

const page = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/menu`
        );
        const { data } = response.data;
        console.log("Search results:", data);
        setMenus(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Menus</h1>
        <p>List of all menu</p>
      </div>

      <div className="pt-6 grid grid-cols-3 gap-x-8 gap-y-6">
        {menus.map((menu, index) => (
          <div
            className="flex flex-col gap-4 p-8  bg-white rounded-md relative"
            key={index}
          >
            <div className="flex justify-center  ">
              <img
                src={menu.product_image}
                alt=""
                className="h-[300px] w-[300px] rounded-md"
              />
            </div>
            <div className="w-full flex justify-between">
              <div className="w-full">
                <p className="text-lg font-semibold">{menu.product_name}</p>
              </div>

              <div className="w-[40%] flex justify-end translate-y-1">
                <p className="text-sm font-semibold text-textRed">
                  Rp. {menu.price}
                </p>
              </div>
            </div>
            <p className="text-xs text-textGray">{menu.description}</p>
            <div className="h-full w-full flex flex-col justify-end items-end translate-x-1">
              <button className="px-8 py-2 rounded-md text-sm text-white  bg-bgRed">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
