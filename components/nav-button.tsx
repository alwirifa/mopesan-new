"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
  icon: string;
  iconWhite: string;
};

const NavButton = ({ href, label, isActive, icon, iconWhite }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "cursor-pointer w-full px-2 py-2 flex gap-3 items-center text-sm font-semibold hover:bg-gray-200 rounded-md",
        isActive ? "bg-primary text-white" : ""
      )}
    >
      <Image
        src={pathname === href ? iconWhite : icon}
        alt={label}
        width={28}
        height={28}
      />
      <div className="w-full justify-start">
        <p>{label}</p>
      </div>
    </Link>
  );
};

export default NavButton;
