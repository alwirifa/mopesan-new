"use client";

import React from "react";
import Navigation from "./navigation";
import UserProfile from "@/app/components/UserProfile";
import Image from "next/image";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="">
        <Image src="/icons/logo.svg" alt="Logo" width={300} height={80} />
        <Navigation />
      </div>
      <UserProfile />
    </div>
  );
};

export default Sidebar;
