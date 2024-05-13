"use client";

import React, { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";
import Link from "next/link";
import { Category, Menu } from '@/app/lib/types/index'
import { getCategories, getMenus } from  '@/app/lib/actions/menuActions';
import { useMenuModal } from "@/app/hooks/useMenuModal";

const Page: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); 
  const [menus, setMenus] = useState<Menu[]>([]);
  const menuModal = useMenuModal();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);

      const fetchedMenus = await getMenus(); 
      setMenus(fetchedMenus);

      // Set selected category from URL parameter, or default to "All"
      const categoryParam = searchParams.get('category');
      setSelectedCategory(categoryParam || 'All');
    };

    fetchData();
  }, [searchParams]);


  // const filteredMenus =
  //   selectedCategory === "All"
  //     ? categories.flatMap((category) => category.menus)
  //     : categories.find(
  //         (category) => category.category_name === selectedCategory
  //       )?.menus || [];

  const filteredMenus =
  selectedCategory === 'All'
    ? menus
    : menus.filter((menu) =>
        categories
          .find((category) => category.category_name === selectedCategory)
          ?.menus.some((m) => m.id === menu.id)
      );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl text-textRed font-semibold">Menus</h1>
            <p>List of all menus</p>
          </div>
          <div>
            {/* <Link
              href="/dashboard/menu/add"
              className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
            >
              + Add Menu
            </Link> */}
            <button
              onClick={menuModal.onOpen}
              className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
            >
              + Add Menu
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href={`?category=All`}
            className={`${
              selectedCategory === "All"
                ? "px-4 py-2 rounded-md text-white bg-bgRed"
                : "px-4 py-2 rounded-md text-textRed border border-bgRed"
            }`}
          >
            All
          </Link>
          {categories.map((category, index) => (
            <Link
              href={`?category=${category.category_name}`}
              key={index}
              className={`${
                selectedCategory === category.category_name
                  ? "px-4 py-2 rounded-md text-white bg-bgRed"
                  : "px-4 py-2 rounded-md text-textRed border border-bgRed"
              }`}
            >
              {category.category_name}
            </Link>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {filteredMenus.map((menu) => {
            // Menmapilkan category sesuai dengan menu
            const menuCategory = categories.find((category) =>
              category.menus.some((m) => m.id === menu.id)
            );
            return (
              <div
                className="flex flex-col gap-4 p-8 bg-white rounded-xl relative border w-full shadow-md"
                key={menu.id}
              >
                <div className="flex justify-center ">
                  <img
                    src={menu.product_image || "/icons/bowl.svg"}
                    alt=""
                    className="h-[300px] w-[300px] rounded-md"
                  />
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold">{menu.product_name}</p>
                    <p className="text-xs text-textGray italic">
                      {menuCategory?.category_name}
                    </p>
                  </div>
                  <div className="w-[40%] flex justify-end translate-y-1">
                    <p className="text-sm font-semibold text-textRed">
                      Rp. {menu.price}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-textGray">{menu.description}</p>
                <div className="h-full w-full flex flex-col justify-end items-end translate-x-1">
                  <Link
                    href={`/dashboard/menu/${menu.id}`}
                    className="px-8 py-2 rounded-md text-sm text-white bg-bgRed"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
