"use client";

import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Dashboard from "../components/dashboard/Dashboard";
import Finance from "../components/dashboard/finance/Finance";

type Props = {};

const DashboardPage = (props: Props) => {
  const { user } = useContext(UserContext);

  if (user?.role_keyword === "admin_finnace") {
    return "finnace";
  }

  return (
    <div> 
      {user?.role_keyword === "admin_finance" ? (
        <Finance/>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default DashboardPage;
