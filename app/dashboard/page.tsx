import React from "react";
import Card from "../ui/dashboard/card/Card";
import Order from "../ui/dashboard/order/Order";
import Chart from "../ui/dashboard/chart/Chart";
import MerchantBar from "../ui/dashboard/merchantsBAR/MerchantBar";
import Search from "../ui/dashboard/search/Search";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-full pb-16">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <Search placeholder="Search ..." />
      </div>
      <div className="flex flex-col gap-5 mt-8  h-full">
        <div className="flex gap-8 w-full ">
          <div className="flex flex-col gap-8 w-full">
            <div className="  w-full">
              <Card />
            </div>
            <div className=" h-full">
              <Order />
            </div>
          </div>
          <div className="w-[40%] h-full ">
            <MerchantBar />
          </div>
        </div>

        <div className="">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default page;
