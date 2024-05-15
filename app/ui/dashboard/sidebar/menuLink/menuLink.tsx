"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  route: string;
  icon: string;
  iconWhite: string;
}

interface MenuLinkProps {
  item: MenuItem;
}

const MenuLink = ({ item }: MenuLinkProps) => {
  const pathname = usePathname();

  //   console.log("Pathname:", pathname);
  //   console.log("Item Route:", item.route);

  return (
    <Link href={item.route} className="w-full flex justify-start text-start">
      <div
        className={`flex items-center p-4  ${
          pathname === item.route ? "bg-primary w-full text-white" : ""
        }`}
      >
        <img
          src={pathname === item.route ? item.iconWhite : item.icon}
          alt={item.title}
          className="w-6 h-6 mr-2 stroke-white"
        />
        <p>{item.title}</p>
      </div>
    </Link>
  );
};

export default MenuLink;
