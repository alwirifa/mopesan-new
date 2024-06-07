import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";
import RequireAuth from "../auth/RequireAuth";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <RequireAuth>
      <div className="flex h-full w-full">
        <div className="w-[25%] p-6  h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="bg-bgGray w-full p-8">{children}</div>
      </div>
    </RequireAuth>
  );
};

export default Layout;
