"use client";


import { deleteMenu, getMenuByID } from "@/app/api/menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

const Page = ({ params }: { params: { id: string } }) => {
  const [menu, setMenu] = useState<any>(null);

  useEffect(() => {
    if (params && params.id) {
      getMenuByID(params.id)
        .then((data) => {
          setMenu(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    }
  }, [params]);

  if (!menu) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {menu.product_name}
      <img src={menu.product_image} alt="" />
      <p>{menu.price}</p>
      <Link href={`/dashboard/menu/edit/${menu.id}`}>EDIT</Link>
      <button onClick={() => deleteMenu(String(menu.id))}>DELETE</button>
    </div>
  );
};

export default Page;
