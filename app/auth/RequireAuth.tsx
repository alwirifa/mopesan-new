"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { UserContext } from "../context/UserContext";

type Props = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: Props) => {
  const { user } = useContext(UserContext);

  const pathname = usePathname();
  const path = pathname;

  console.log(path);

  // Define allowed paths for each role
  const rolePaths: { [key: string]: string[] } = {
    super_admin: ["*"],
    admin_merchant: ["/dashboard", "dashboard/merchant", "dashboard/staff"],
    admin_finance: [
      "/dashboard",
      "/dashboard/report/total_sales",
      "/dashboard/report/merchant_sales",
      "/dashboard/report/order_sales",
      "/dashboard/report/payment_method_sales",
      "/dashboard/report/periodic_sales",
      "/dashboard/report/product_sales",
      "/dashboard/report/tax_report",
    ],
  };

  // Function to check if the current path is allowed for the user's role
  const isPathAllowed = (role: string, path: string): boolean => {
    const allowedPaths = rolePaths[role] || [];
    return (
      allowedPaths.includes("*") || allowedPaths.some((p) => path.startsWith(p))
    );
  };

  if (!user || !isPathAllowed(user.role_keyword, path)) {
    // Redirect to login page or show an error message if the user doesn't have access
    // router.push('/login'); // or you can show an error message
    return <div>You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
};

export default RequireAuth;
