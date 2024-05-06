"use client"

// Import statements
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// Define Menu and Category interfaces
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

// Page component
const Page: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

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

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  // Filter categories (fix)
  const filteredCategories =
    selectedCategory === "All"
      ? categories
      : categories.filter(
          (category) => category.category_name === selectedCategory
        );

  const allMenus = filteredCategories.flatMap((category) => category.menus);

  return (
    <div className=" rounded-md p-6 w-full h-full">
      <div className="flex flex-col">
        <div className="mr-4">
          <h2>Categories:</h2>
          <ul>
            <div className="flex gap-4">
              <li>
                <Link
                  href={`?category`}
                  className={`${
                    selectedCategory === "All" ? "text-blue-500" : ""
                  }`} 
                >
                  All
                </Link>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={`?category=${category.category_name}`}
                    className={`${
                      selectedCategory === category.category_name
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {category.category_name}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-4 bg-red-500 w-full">
          {allMenus.map((menu, index) => (
            <div
              className="flex flex-col gap-4 p-8 bg-white rounded-md relative border w-full"
              key={index}
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
    </div>
  );
};

export default Page;
