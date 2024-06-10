"use client";

import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Dashboard from "../components/dashboard/Dashboard";
import Finance from "../components/dashboard/finance/Finance";
import Merchant from "../components/dashboard/Merchant/Merchant";

type Props = {};

const DashboardPage = (props: Props) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user?.role_keyword === "admin_finance" ? (
        <Finance />
      ) : user?.role_keyword === "admin_merchant" ? (
        <Merchant />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default DashboardPage;
