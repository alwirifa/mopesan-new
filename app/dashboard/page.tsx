import React from "react";
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard'
import Link from "next/link";
import MerchantBar from "../ui/dashboard/merchantsBAR/MerchantBar";
import Chart from "@/app/ui/dashboard/chart/Chart"
import Last10Order from "../ui/dashboard/home/Last10Order";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          {/* <Search placeholder="Search ..." /> */}
        </div>

        <DashboardCard />

        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Merchants</h1>
            <Link
              className="italic text-primary underline"
              href={'/dashboard/merchants'}
            >
              View All
            </Link>
          </div>
          <MerchantBar />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Order Activity</h1>
          <Chart />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">

            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">Latest Order</h1>
              <p className="italic text-textGray text-sm">Showing latest 10 Orders</p>
            </div>
            <Link
              className="italic text-primary underline"
              href={'/dashboard/order'}
            >
              View All
            </Link>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-custom">

          <Last10Order />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
