import React from "react";
import MenuLink from "./menuLink/menuLink";
import ProfilePage from "../profilePage/ProfilePage";

interface MenuItem {
  title: string;
  route: string;
  icon: string;
  iconWhite: string;
  // Jika diperlukan, tambahkan properti lainnya seperti 'icon'
}

const menuItems: MenuItem[] = [
  {
    title: "Home",
    route: "/dashboard",
    icon: "/icons/home.svg",
    iconWhite: "/icons/homeWhite.svg"
  },
  {
    title: "Merchant",
    route: "/dashboard/merchants",
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
    title: "Voucher",
    route: "/dashboard/voucher",
    icon: "/icons/ticket.svg",
    iconWhite: "/icons/ticketWhite.svg",
  },
  {
    title: "Promotional Banner",
    route: "/dashboard/promotionalBanner",
    icon: "/icons/layout-board-split.svg",
    iconWhite: "/icons/layout-board-splitWhite.svg",
  },
  {
    title: "Customer",
    route: "/dashboard/customer",
    icon: "/icons/users.svg",
    iconWhite: "/icons/usersWhite.svg",
  },
  {
    title: "Admin",
    route: "/dashboard/admin",
    icon: "/icons/verified-user.svg",
    iconWhite: "/icons/verified-userWhite.svg",
  },
];

const Sidebar = () => {
  return (
    <div className="h-full relative">
      <div className="flex flex-col gap-5">
        <div className="">
          <img src="/icons/logo.svg" alt="" className="w-full h-full"/>
        </div>
        <div className="flex flex-col  ">
          {menuItems.map((item) => (
            <button
              key={item.title}
              className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer font-semibold"
            >
              <MenuLink item={item} />
            </button>
          ))}
          <div className="absolute w-full left-0 bottom-0">
            <ProfilePage adminId={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
