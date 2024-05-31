"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useEditMenuModal } from "@/app/hooks/menu/useEditMenuModal";
import { useMenuModal } from "@/app/hooks/menu/useMenuModal";
import { Category, Menu } from "@/app/types/types";
import { getCategories } from "@/app/api/menu";
import { formatCurrency } from "@/app/lib/formatter";
import EditMenuModal from "@/app/components/modal/menu/EditMenuModal";
import MenuFilter from "@/app/components/MenuFilter";
import Heading from "@/app/components/Heading";
import MenuModal from "@/app/components/modal/menu/MenuModal";

export default function Page({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    selectedCategory?: string;
  };
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.selectedCategory || "All"
  );
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredMenus =
    selectedCategory === "All"
      ? categories.flatMap((category) => category.menus)
      : categories.find(
        (category) => category.category_name === selectedCategory
      )?.menus || [];

  const options = [
    { label: "All", value: "All" },
    ...categories.map((category) => ({
      label: category.category_name,
      value: category.category_name,
    })),
  ];

  const menuModal = useMenuModal();
  const editMenuModal = useEditMenuModal();

  const handleEditMenuClick = (menu: Menu) => {
    setSelectedMenu(menu);
    editMenuModal.onOpen();
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading title='Menus' subtitle='List of all menus' buttonTitle='+ Add Menu' onButtonClick={menuModal.onOpen} />
      <MenuFilter
        label="selectedCategory"
        options={options}
        value={selectedCategory}
        onChange={setSelectedCategory}
      />
      <div className="grid grid-cols-3 gap-8 mt-2">
        {filteredMenus.map((menu) => {
          const menuCategory = categories.find((category) =>
            category.menus.some((m) => m.id === menu.id)
          );
          return (
            <div
              key={menu.id}
              className="flex flex-col justify-between shadow-custom rounded-xl bg-primary"
            >
              <div className="bg-white flex flex-col justify-between rounded-xl h-full">
                <div className="h-full flex justify-center py-8">
                  <Image
                    src={menu.product_image || "/icons/bowl.svg"}
                    alt=""
                    height={400}
                    width={400}
                  />
                </div>
                <div className="pb-8 px-8">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">
                      {menu.product_name}
                    </p>
                    <p className="font-semibold text-primary">
                      {formatCurrency(menu.price)}
                    </p>
                  </div>
                  <p className="text-xs text-textGray italic">
                    {menuCategory?.category_name}
                  </p>
                  <p className="mt-2 text-textGray">
                    {menu.description || "Description"}
                  </p>
                </div>
              </div>
              <div className="px-8 py-4 text-white font-semibold">
                <button onClick={() => handleEditMenuClick(menu)}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
      <MenuModal />
      <EditMenuModal selectedMenu={selectedMenu} />
    </div>
  );
}
