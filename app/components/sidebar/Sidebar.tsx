"use client";

import { UserContext } from "../../context/UserContext";
import React, { useContext } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Profile from "../UserProfile";
import UserProfile from "../UserProfile";
import Image from "next/image";
import MenuLink from "./MenuLink";

interface MenuItem {
  title: string;
  route: string;
  icon: string;
  iconWhite: string;
  subtitle?: MenuItem[];
  sales_subtitle?: MenuItem[];
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
    title: "Menu",
    route: "/dashboard/menu",
    icon: "/icons/tags.svg",
    iconWhite: "/icons/tagsWhite.svg",
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
    title: "Report",
    route: "/dashboard/report/order-sales",
    icon: "/icons/article.svg",
    iconWhite: "/icons/articleWhite.svg",
    subtitle: [
      {
        title: "Sales Report",
        route: "/dashboard/report/order-sales",
        icon: "/icons/sidebar/bullet_icon.svg",
        iconWhite: "/icons/sidebar/bullet_icon_white.svg",
        sales_subtitle: [
          {
            title: "Order Sales",
            route: "/dashboard/report/order-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            title: "Periodic Sales",
            route: "/dashboard/report/periodic-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            title: "Merchant Sales",
            route: "/dashboard/report/merchant-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            title: "Payment Method Sales",
            route: "/dashboard/report/payment-method-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            title: "Product Sales",
            route: "/dashboard/report/product-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
        ],
      },
      {
        title: "Tax Report",
        route: "/dashboard/report/tax-report",
        icon: "/icons/sidebar/bullet_icon.svg",
        iconWhite: "/icons/sidebar/bullet_icon_white.svg",
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
        route: "/dashboard/settings/fee",
        icon: "/icons/sidebar/fee.svg",
        iconWhite: "/icons/sidebar/fee-white.svg",
      },
      {
        title: "Custom Notification",
        route: "/dashboard/settings/custom-notif",
        icon: "/icons/sidebar/notif.svg",
        iconWhite: "/icons/sidebar/notif-white.svg",
      },
      {
        title: "Admin",
        route: "/dashboard/settings/admin",
        icon: "/icons/verified-user.svg",
        iconWhite: "/icons/verified-userWhite.svg",
      },
      {
        title: "Staff",
        route: "/dashboard/settings/staff",
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
        "Report",
        "Sales Report",
        "Tax Report",
        "Order Sales",
        "Periodic Sales",
        "Merchant Sales",
        "Payment Method Sales",
        "Product Sales",
        "Settings",
        "Addtional Fee",
        "Custom Notification",
        "Admin",
        "Staff",
      ];
      break;
    case "admin_finance":
      allowedMenuItems = ["Home", "Sales"];
      break;
    default:
      allowedMenuItems = [];
  }

  return (
    <div className="h-full max-h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-5 h-[80%] overflow-hidden">
      <Image src="/icons/logo.svg" alt="Logo" width={300} height={80} />
     
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Accordion type="multiple" className="animate-none">
            {menuItems.map((item) => {
              if (item.subtitle) {
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
                          {item.subtitle.map((subItem) => {
                            if (
                              allowedMenuItems.includes(subItem.title) &&
                              subItem.sales_subtitle
                            ) {
                              return (
                                <AccordionItem
                                  key={subItem.title}
                                  value={subItem.title}
                                >
                                  <li key={subItem.title} className="ml-4">
                                    <AccordionTrigger>
                                      <div className="flex items-center font-semibold gap-1 px-4 text-lg">
                                        <Image
                                          src={subItem.icon}
                                          alt={subItem.title}
                                          width={28}
                                          height={28}
                                        />
                                        <span className="text-[16px]">
                                          {subItem.title}
                                        </span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <ul className="ml-4">
                                        {subItem.sales_subtitle.map(
                                          (salesSubItem) =>
                                            allowedMenuItems.includes(
                                              salesSubItem.title
                                            ) ? (
                                              <li
                                                key={salesSubItem.title}
                                                className="ml-4"
                                              >
                                                <button className="flex w-full items-center space-x-2 hover:bg-gray-200 cursor-pointer text-[16px] font-semibold">
                                                  <MenuLink
                                                    item={salesSubItem}
                                                  />
                                                </button>
                                              </li>
                                            ) : null
                                        )}
                                      </ul>
                                    </AccordionContent>
                                  </li>
                                </AccordionItem>
                              );
                            } else if (
                              allowedMenuItems.includes(subItem.title)
                            ) {
                              return (
                                <AccordionItem
                                  key={subItem.title}
                                  value={subItem.title}
                                >
                                  <li key={subItem.title} className="ml-4">
                                    <button className="flex w-full items-center space-x-2 hover:bg-gray-200 cursor-pointer text-[16px] font-semibold">
                                      <MenuLink item={subItem} />
                                    </button>
                                  </li>
                                </AccordionItem>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                } else {
                  return null;
                }
              } else {
                return (
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
      <div className="px-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default Sidebar;
