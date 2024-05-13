"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Modal from '../Modal';
import { useMenuDetailModal } from "@/app/hooks/menu/useMenuDetailModal";
import { deleteMenu } from "@/app/lib/actions/menuActions";

type Menu = {
    id: number;
    product_name: string;
    price: number;
    description: string;
    product_code: string;
    product_image: string;
};

const MenuDetailModal = () => {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [menuId, setMenuId] = useState<string | null>(null); // State to hold the menu id

    useEffect(() => {
        if (menuId) {
            const fetchMenu = async () => {
                try {
                    const token = localStorage.getItem("admin_token");
                    if (!token) {
                        throw new Error("Admin token not found");
                    }
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/menu/${menuId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const { data } = response.data;
                    setMenu(data);
                } catch (error) {
                    console.error("Error fetching Menu:", error);
                }
            };

            fetchMenu();
        }
    }, [menuId]);

    const menuModal = useMenuDetailModal();

    const titleContent = (
        <div>
            <h1 className="text-4xl font-semibold"></h1>
        </div>
    );

    const bodyContent = (
        <div>
            <div>
                {menu?.product_name}
                <img src={menu?.product_image} alt="" />
                <p>{menu?.price}</p>
                <Link href={`/dashboard/menu/edit/${menu?.id}`}>EDIT</Link>
                <button onClick={() => deleteMenu(String(menu?.id))}>DELETE</button>
            </div>
        </div>
    );

    return (
        <Modal isOpen={menuModal.isOpen} onClose={menuModal.onClose} title={titleContent} body={bodyContent} />
    );
};

export default MenuDetailModal;
