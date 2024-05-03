import React, { ReactNode } from "react";
import Sidebar from "../ui/dashboard/sidebar/Sidebar";
import Navbar from "../ui/dashboard/navbar/Navbar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <div className="flex-none w-1/4 p-8">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 bg-bgGray">
        {/* <Navbar /> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
