"use client";

import Link from "next/link";
import React, { useContext } from "react";
import LatestOrder from "@/app/components/dashboard/LatestOrder";
import OrdersCard from "@/app/components/dashboard/OrderCard";
import MerchantCard from "@/app/components/dashboard/MerchantCard";
import OrderChart from "@/app/components/dashboard/OrderChart";

type Props = {};

const Merchant = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-8 ">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          {/* <Search placeholder="Search ..." /> */}
        </div>
        <OrdersCard />

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Order Activity</h1>
          <OrderChart />
        </div>
      </div>
    </div>
  );
};

export default Merchant;
