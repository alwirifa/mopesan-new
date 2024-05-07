"use client";

// Import statements
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

type Menu = {
  id: number;
  product_name: string;
  price: number;
  description: string;
  product_code: string;
  product_image: string;
};

type Category = {
  id: number;
  category_name: string;
  menus: Menu[];
};

const Page: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/category-full`
        );
        const { data } = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const filteredMenus = selectedCategory === null || selectedCategory === "All"
  ? categories.flatMap((category) => category.menus)
  : categories
      .find((category) => category.category_name === selectedCategory) 
      ?.menus || [];

  return (
    <div>
      <div className="flex gap-4">
        <Link
          href={`?category=All`}
          className={`${selectedCategory === "All" ? "text-blue-500" : ""}`}
        >
          All
        </Link>
        {categories.map((category, index) => (
          <Link
            href={`?category=${category.category_name}`}
            key={index}
            className={`${
              selectedCategory === category.category_name ? "text-blue-500" : ""
            }`}
          >
            {category.category_name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredMenus.map((menu) => (
          <div
            className="flex flex-col gap-4 p-8 bg-white rounded-md relative border w-full"
            key={menu.id}
          >
            <div className="flex justify-center ">
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
              <button className="px-8 py-2 rounded-md text-sm text-white bg-bgRed">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
