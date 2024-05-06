"use client"

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
  const selectedCategory = searchParams.get("category") || "All";

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

  const filteredMenus = selectedCategory === "All"
    ? categories.flatMap((category) => category.menus) // Flatten all menus for "All"
    : categories
        .find((category) => category.category_name === selectedCategory) // Find matching category
        ?.menus || []; // Extract menus from the matching category or return empty array

  return (
    <div>
      <div className="flex gap-4">
        
        {categories.map((category, index) => (
          <li key={index}>
         
            <Link
              href={`?category=${category.category_name}`}
              className={`${
                selectedCategory === category.category_name ? "text-blue-500" : ""
              }`}
            >
              {category.category_name}
            </Link>
          </li>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredMenus.map((menu) => (
          <div key={menu.id} className="menu-item">
            <h3>{menu.product_name}</h3>
            <p>{menu.description}</p>
            <p>Price: ${menu.price}</p>
            <img src={menu.product_image} alt={menu.product_name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
