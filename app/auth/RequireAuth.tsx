"use client";

import React, { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: Props) => {
  const { user, ready } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname;

  // Debug: Log pathname
  // useEffect(() => {
  //   console.log("Current pathname:", path);
  // }, [path]);

  useEffect(() => {
    if (ready && !user) {
      router.push("/auth/login");
    }
  }, [ready, user, router]);

  if (!ready) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin size-12 text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; // Render nothing while redirecting
  }

  // console.log("User role keyword:", user.role_keyword);

  // Define allowed paths for each role, using regular expressions for dynamic segments
  const rolePaths: { [key: string]: (string | RegExp)[] } = {
    super_admin: ["*"],
    admin_merchant: [
      "/dashboard",
      "/dashboard/merchant",
      "/dashboard/settings/staff",
      "/dashboard/notif",
      "/dashboard/menu",
      /^\/dashboard\/settings\/staff\/\d+$/, // Regex to match paths like /dashboard/settings/staff/123
    ],
    admin_finance: [
      "/dashboard",
      "/dashboard/report/total-sales",
      "/dashboard/report/merchant-sales",
      "/dashboard/report/order-sales",
      "/dashboard/report/payment-method-sales",
      "/dashboard/report/periodic-sales",
      "/dashboard/report/product-sales",
      "/dashboard/report/tax-report",
    ],
  };

  const isPathAllowed = (role: string, path: string): boolean => {
    const allowedPaths = rolePaths[role] || [];
    // Special case for super_admin
    if (role === "super_admin" && allowedPaths.includes("*")) {
      return true;
    }
    const allowed = allowedPaths.some((allowedPath) =>
      typeof allowedPath === "string"
        ? allowedPath === path
        : allowedPath.test(path)
    );
    // Debug: Log path checking
    // console.log(`Checking path for role ${role}:`, allowedPaths, path, allowed);

    return allowed;
  };

  if (!isPathAllowed(user.role_keyword, path)) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-2xl text-center font-semibold">
        You do not have permission to access this page.
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
