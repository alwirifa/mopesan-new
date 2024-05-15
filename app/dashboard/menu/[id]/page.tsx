"use client";

import { deleteMenu, getMenuByID } from "@/app/lib/actions/menuActions";
import axios from "axios";
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

const page = ({ params }: { params: { id: string } }) => {
  const [menu, setMenu] = useState<any>(null);

  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     try {
  //       const token = localStorage.getItem("admin_token");
  //       if (!token) {
  //         throw new Error("Admin token not found");
  //       }
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/menu/${params.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const { data } = response.data;
  //       setMenu(data);
  //     } catch (error) {
  //       console.error("Error fetching Menu:", error);
  //     }
  //   };

  //   fetchMenu();
  // }, []);

  useEffect(() => {
    if (params && params.id) {
      getMenuByID(params.id)
        .then((data) => {
          setMenu(data);
          console.log(data)
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

export default page;
