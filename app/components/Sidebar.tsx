"use client";

import { UserContext } from "../context/UserContext";
import React, { useContext } from "react";
import MenuLink from "./MenuLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Profile from "./UserProfile";
import UserProfile from "./UserProfile";
import Image from "next/image";

interface MenuItem {
  title: string;
  route: string;
  icon: string;
  iconWhite: string;
  subtitle?: MenuItem[];
  sales_subtitle?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "Home",
    route: "/dashboard",
    icon: "/icons/home.svg",
    iconWhite: "/icons/homeWhite.svg",
  },
  {
    title: "Sales",
    route: "/dashboard/sales",
    icon: "/icons/article.svg",
    iconWhite: "/icons/articleWhite.svg",
  },
  {
    title: "Merchant",
    route: "/dashboard/merchant",
    icon: "/icons/building-store.svg",
    iconWhite: "/icons/building-storeWhite.svg",
  },
  {
    title: "Order",
    route: "/dashboard/order",
    icon: "/icons/article.svg",
    iconWhite: "/icons/articleWhite.svg",
  },
  {
    title: "Menu",
    route: "/dashboard/menu",
    icon: "/icons/tags.svg",
    iconWhite: "/icons/tagsWhite.svg",
  },
  {
    title: "Additional Fee",
    route: "/dashboard/fee",
    icon: "/icons/sidebar/fee.svg",
    iconWhite: "/icons/sidebar/fee-white.svg",
  },
  {
    title: "Voucher",
    route: "/dashboard/voucher",
    icon: "/icons/ticket.svg",
    iconWhite: "/icons/ticketWhite.svg",
  },
  {
    title: "Promotional Banner",
    route: "/dashboard/banner",
    icon: "/icons/layout-board-split.svg",
    iconWhite: "/icons/layout-board-splitWhite.svg",
  },
  {
    title: "Promotional Notification",
    route: "/dashboard/notif",
    icon: "/icons/sidebar/notif.svg",
    iconWhite: "/icons/sidebar/notif-white.svg",
  },
  {
    title: "Customer",
    route: "/dashboard/customer",
    icon: "/icons/users.svg",
    iconWhite: "/icons/usersWhite.svg",
  },
  {
    title: "User Management",
    route: "/dashboard/admin",
    icon: "/icons/verified-user.svg",
    iconWhite: "/icons/verified-userWhite.svg",
    subtitle: [
      {
        title: "Admin",
        route: "/dashboard/admin",
        icon: "/icons/verified-user.svg",
        iconWhite: "/icons/verified-userWhite.svg",
      },
      {
        title: "Staff",
        route: "/dashboard/staff",
        icon: "/icons/verified-user.svg",
        iconWhite: "/icons/verified-userWhite.svg",
      },
    ],
  },
  {
    title: "Report",
    route: "/dashboard/report",
    icon: "/icons/verified-user.svg",
    iconWhite: "/icons/verified-userWhite.svg",
    subtitle: [
      {
        title: "Sales Report",
        route: "/dashboard/report",
        icon: "",
        iconWhite: "",
        sales_subtitle: [
          {
            title: 'Order Sales',
            route: '/dashboard',
            icon: "/icons/verified-user.svg",
            iconWhite: "/icons/verified-userWhite.svg",
          },
          {
            title: 'Periodic Sales',
            route: '/dashboard',
            icon: "/icons/verified-user.svg",
            iconWhite: "/icons/verified-userWhite.svg",
          },
          {
            title: 'Payment Method Sales',
            route: '/dashboard',
            icon: "/icons/verified-user.svg",
            iconWhite: "/icons/verified-userWhite.svg",
          },
          {
            title: 'Product Sales',
            route: '/dashboard',
            icon: "/icons/verified-user.svg",
            iconWhite: "/icons/verified-userWhite.svg",
          },
        ],
      },
    ],
  },
  {
    title: "Settings",
    route: "/dashboard/admin",
    icon: "/icons/verified-user.svg",
    iconWhite: "/icons/verified-userWhite.svg",
    subtitle: [
      {
        title: "Additional Fee",
        route: "/dashboard/admin",
        icon: "/icons/verified-user.svg",
        iconWhite: "/icons/verified-userWhite.svg",
      },
      {
        title: "Custom Notification",
        route: "/dashboard/staff",
        icon: "/icons/verified-user.svg",
        iconWhite: "/icons/verified-userWhite.svg",
      },
    ],
  },
];
const Sidebar = () => {
  const { user } = useContext(UserContext);

  let allowedMenuItems: string | string[];
  switch (user?.role_keyword) {
    case "admin_merchant":
      allowedMenuItems = [
        "Home",
        "Order",
        "Menu",
        "Customer",
        "Promotional Notification",
        "Staff",
      ];
      break;
    case "super_admin":
      allowedMenuItems = [
        "Home",
        "Merchant",
        "Order",
        "Menu",
        "Additional Fee",
        "Voucher",
        "Promotional Banner",
        "Promotional Notification",
        "Customer",
        "Admin",
        "Staff",
        'Report',
        'Sales Report'
      ];
      break;
    case "admin_finance":
      allowedMenuItems = ["Home", "Sales"];
      break;
    default:
      allowedMenuItems = [];
  }



  return (
    <div className="h-full relative flex flex-col justify-between">
      <div className="p-6 px-8 pt-0 grid gap-4">
        <h4>Current User Context:</h4>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <p>{user?.role_keyword || "Role not available"}</p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="">
          <img src="/icons/logo.svg" alt="Logo" className="w-full h-full" />
        </div>
        <div className="flex flex-col">
          <Accordion type="multiple" className="animate-none">
            {menuItems.map((item) => {
              if (item.subtitle) {
                // Periksa apakah setidaknya satu sub item diizinkan
                const hasAllowedSubItem = item.subtitle.some((subItem) =>
                  allowedMenuItems.includes(subItem.title)
                );

                if (hasAllowedSubItem) {
                  return (
                    <AccordionItem key={item.title} value={item.title}>
                      <AccordionTrigger className="">
                        <div className="flex items-center font-semibold gap-1 px-4 text-lg">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            width={28}
                            height={28}
                          />
                          <span>{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="animate-none">
                        <ul className="flex flex-col space-y-2 capitalize w-full">
                          {item.subtitle.map(
                            (subItem) =>
                              // Periksa apakah sub item diizinkan
                              allowedMenuItems.includes(subItem.title) && (
                                <li key={subItem.title} className="ml-4">
                                  <button className="flex w-full items-center space-x-2 hover:bg-gray-200 cursor-pointer text-[16px] font-semibold">
                                    <MenuLink item={subItem} />
                                  </button>
                                </li>
                              )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                } else {
                  // Sembunyikan tombol jika tidak ada sub item yang diizinkan
                  return null;
                }
              } else {
                // Jika item tidak memiliki sub item
                return (
                  // Periksa apakah item diizinkan
                  allowedMenuItems.includes(item.title) && (
                    <button
                      key={item.title}
                      className="flex w-full items-center space-x-2 hover:bg-gray-200 cursor-pointer font-semibold text-lg"
                    >
                      <MenuLink item={item} />
                    </button>
                  )
                );
              }
            })}
          </Accordion>
        </div>
      </div>
      <UserProfile />
    </div>
  );
};

export default Sidebar;
