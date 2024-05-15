import React, { ReactNode } from "react";
import Sidebar from "../ui/dashboard/sidebar/Sidebar";
import Navbar from "../ui/dashboard/navbar/Navbar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-full w-full">
      <div className="h-screen w-[20%] p-6 sticky top-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 bg-bgGray">   
        {children}
      </div>
    </div>
  );
};

export default Layout;
