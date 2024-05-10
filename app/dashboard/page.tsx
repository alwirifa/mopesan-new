import React from "react";
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard'
import Link from "next/link";
import MerchantBar from "../ui/dashboard/merchantsBAR/MerchantBar";
import Chart from "@/app/ui/dashboard/chart/Chart"

type Props = {};

const page = (props: Props) => {
  return (
    // <div className="h-full pb-16">
    // <div className="w-full flex justify-between items-center">
    //   <h1 className="text-4xl font-semibold">Dashboard</h1>
    //   {/* <Search placeholder="Search ..." /> */}
    // </div>
    //   <div className="flex flex-col gap-5 mt-8  h-full">
    //     <div className="flex gap-8 w-full ">
    //       <div className="flex flex-col gap-8 w-full">
    //         <div className="  w-full">
    //           <Card />
    //         </div>
    //         <div className=" h-full">
    //           <Order />
    //         </div>
    //       </div>
    //       <div className="w-[40%] h-full ">
    //         <MerchantBar />
    //       </div>
    //     </div>

    //     <div className="">
    //       <Chart />
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="flex flex-col gap-8">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          {/* <Search placeholder="Search ..." /> */}
        </div>
        <DashboardCard />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Merchants</h1>
          <MerchantBar />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Order Activity</h1>
            <Link
              className="italic"
              href={'/dashboard/merchants'}
            >
              View All
            </Link>
          </div>
          <Chart />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Latest Order</h1>
            <p className="italic text-textGray text-sm">Showing latest 10 Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
