"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import NavButton from "./nav-button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import Image from "next/image";
import { UserContext } from "@/app/context/UserContext";

type Route = {
  label: string;
  href: string;
  icon: string;
  iconWhite: string;
  subRoutes?: Route[];
  subSubRoutes?: Route[];
};

const routes: Route[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: "/icons/home.svg",
    iconWhite: "/icons/homeWhite.svg",
  },
  {
    label: "Merchant",
    href: "/dashboard/merchant",
    icon: "/icons/building-store.svg",
    iconWhite: "/icons/building-storeWhite.svg",
  },
  {
    label: "Menu",
    href: "/dashboard/menu",
    icon: "/icons/tags.svg",
    iconWhite: "/icons/tagsWhite.svg",
  },
  {
    label: "Voucher",
    href: "/dashboard/voucher",
    icon: "/icons/ticket.svg",
    iconWhite: "/icons/ticketWhite.svg",
  },
  {
    label: "Promotional Banner",
    href: "/dashboard/banner",
    icon: "/icons/layout-board-split.svg",
    iconWhite: "/icons/layout-board-splitWhite.svg",
  },
  {
    label: "Promotional Notification",
    href: "/dashboard/notif",
    icon: "/icons/sidebar/notif.svg",
    iconWhite: "/icons/sidebar/notif-white.svg",
  },
  {
    label: "Customer",
    href: "/dashboard/customer",
    icon: "/icons/users.svg",
    iconWhite: "/icons/usersWhite.svg",
  },
  {
    label: "Report",
    href: "/dashboard/report/order-sales",
    icon: "/icons/article.svg",
    iconWhite: "/icons/articleWhite.svg",
    subRoutes: [
      {
        label: "Sales Report",
        href: "/dashboard/report/order-sales",
        icon: "/icons/sidebar/bullet_icon.svg",
        iconWhite: "/icons/sidebar/bullet_icon_white.svg",
        subSubRoutes: [
          {
            label: "Total Sales",
            href: "/dashboard/report/total-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            label: "Order Sales",
            href: "/dashboard/report/order-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            label: "Periodic Sales",
            href: "/dashboard/report/periodic-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            label: "Merchant Sales",
            href: "/dashboard/report/merchant-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            label: "Payment Method Sales",
            href: "/dashboard/report/payment-method-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
          {
            label: "Product Sales",
            href: "/dashboard/report/product-sales",
            icon: "/icons/sidebar/bullet_icon.svg",
            iconWhite: "/icons/sidebar/bullet_icon_white.svg",
          },
        ],
      },
      {
        label: "Tax Report",
        href: "/dashboard/report/tax-report",
        icon: "/icons/sidebar/bullet_icon.svg",
        iconWhite: "/icons/sidebar/bullet_icon_white.svg",
      },
    ],
  },
  {
    label: "Settings",
    href: "/dashboard/admin",
    icon: "/icons/verified-user.svg",
    iconWhite: "/icons/verified-userWhite.svg",
    subRoutes: [
      {
        label: "Additional Fee",
        href: "/dashboard/settings/fee",
        icon: "/icons/sidebar/fee.svg",
        iconWhite: "/icons/sidebar/fee-white.svg",
      },
      {
        label: "Custom Notification",
        href: "/dashboard/settings/custom-notif",
        icon: "/icons/sidebar/notif.svg",
        iconWhite: "/icons/sidebar/notif-white.svg",
      },
      {
        label: "Admin",
        href: "/dashboard/settings/admin",
        icon: "/icons/verified-user.svg",
        iconWhite: "/icons/verified-userWhite.svg",
      },
      {
        label: "Staff",
        href: "/dashboard/settings/staff",
        icon: "/icons/verified-user.svg",
        iconWhite: "/icons/verified-userWhite.svg",
      },
    ],
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isSubSubRouteActive = (subRoutes: Route[] = []): boolean => {
    return subRoutes.some((subRoute) => {
      if (subRoute.subSubRoutes) {
        return isSubSubRouteActive(subRoute.subSubRoutes);
      }
      return subRoute.href === pathname;
    });
  };

  const { user } = useContext(UserContext);

  let allowedMenuItems: string[];
  switch (user?.role_keyword) {
    case "admin_merchant":
      allowedMenuItems = [
        "Home",
        "Order",
        "Menu",
        "Merchant",
        "Promotional Notification",
        "Settings",
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
        "Total Sales",
        "Sales Report",
        "Tax Report",
        "Order Sales",
        "Periodic Sales",
        "Merchant Sales",
        "Payment Method Sales",
        "Product Sales",
        "Settings",
        "Additional Fee",
        "Custom Notification",
        "Admin",
        "Staff",
      ];
      break;
    case "admin_finance":
      allowedMenuItems = [
        "Home",
        "Report",
        "Total Sales",
        "Sales Report",
        "Tax Report",
        "Order Sales",
        "Periodic Sales",
        "Merchant Sales",
        "Payment Method Sales",
        "Product Sales",
      ];
      break;
    default:
      allowedMenuItems = [];
  }

  const filterRoutes = (routes: Route[], allowedItems: string[]): Route[] => {
    return routes
      .filter((route) => allowedItems.includes(route.label))
      .map((route) => {
        if (route.subRoutes) {
          route.subRoutes = filterRoutes(route.subRoutes, allowedItems);
        }
        if (route.subSubRoutes) {
          route.subSubRoutes = filterRoutes(route.subSubRoutes, allowedItems);
        }
        return route;
      });
  };

  const filteredRoutes = filterRoutes(routes, allowedMenuItems);

  return (
    <div className="h-[65vh] max-h-screen overflow-y-auto pr-2">
      <Accordion type="multiple" className="animate-none flex flex-col gap-4">
        {filteredRoutes.map((route) => (
          <div key={route.href}>
            {route.subRoutes ? (
              <AccordionItem value={route.label} key={route.label}>
                <div
                  className={`font-medium ${
                    isSubSubRouteActive(route.subRoutes)
                      ? "bg-primary rounded-md text-white w-full text-left"
                      : ""
                  } text-gray-900`}
                >
                  <AccordionTrigger className="py-2 px-2 text-sm text-gray-400 hover:text-gray-500">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={
                          isSubSubRouteActive(route.subRoutes)
                            ? route.iconWhite
                            : route.icon
                        }
                        alt={route.label}
                        width={28}
                        height={28}
                      />
                      <span
                        className={`font-medium ${
                          isSubSubRouteActive(route.subRoutes)
                            ? "bg-primary rounded-md text-white w-full text-left"
                            : ""
                        } text-gray-900 font-semibold`}
                      >
                        {route.label}
                      </span>
                    </div>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="pl-2 mt-2 flex flex-col gap-2 animate-none">
                  {route.subRoutes.map((subRoute) => (
                    <div key={subRoute.href}>
                      {subRoute.subSubRoutes ? (
                        <AccordionItem
                          value={subRoute.label}
                          key={subRoute.label}
                        >
                          <div
                            className={`font-medium ${
                              isSubSubRouteActive(subRoute.subSubRoutes)
                                ? "rounded-md text-white w-full text-left bg-primary"
                                : ""
                            } text-gray-900`}
                          >
                            <AccordionTrigger className="py-2 px-2 text-sm hover:text-gray-500">
                              <div className="flex gap-2 items-center">
                                <Image
                                  src={
                                    isSubSubRouteActive(subRoute.subSubRoutes)
                                      ? subRoute.iconWhite
                                      : subRoute.icon
                                  }
                                  alt={route.label}
                                  width={28}
                                  height={28}
                                />
                                <span className="font-semibold">
                                  {subRoute.label}
                                </span>
                              </div>
                            </AccordionTrigger>
                          </div>
                          <AccordionContent className="pl-2 mt-2 flex flex-col gap-2 animate-none">
                            {subRoute.subSubRoutes.map((subSubRoute) => (
                              <NavButton
                                key={subSubRoute.href}
                                href={subSubRoute.href}
                                label={subSubRoute.label}
                                icon={subSubRoute.icon}
                                iconWhite={subRoute.iconWhite}
                                isActive={pathname === subSubRoute.href}
                              />
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <NavButton
                          key={subRoute.href}
                          href={subRoute.href}
                          label={subRoute.label}
                          icon={subRoute.icon}
                          iconWhite={subRoute.iconWhite}
                          isActive={pathname === subRoute.href}
                        />
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ) : (
              <NavButton
                key={route.href}
                href={route.href}
                label={route.label}
                icon={route.icon}
                iconWhite={route.iconWhite}
                isActive={pathname === route.href}
              />
            )}
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default Navigation;
