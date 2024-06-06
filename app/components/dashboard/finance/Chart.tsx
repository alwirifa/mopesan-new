import React from "react";
import LineChart from "./LineChart";

type Props = {};

const Chart = (props: Props) => {
  return (
    <div className="flex gap-8  ">
      <div className="flex-1 flex flex-col gap-2 bg-white p-6 rounded-lg">
        <h1 className="text-[16px]">Pendapatan Kotor</h1>
        <h2 className="text-[24px] font-semibold">Rp. 1.888.888</h2>
        <LineChart />
      </div>
      <div className="flex-1 flex flex-col gap-2 bg-white p-6 rounded-lg">
        <h1 className="text-[16px]">Total Transaksi Kotor</h1>
        <h2 className="text-[24px] font-semibold">15 Transaksi</h2>
        <LineChart />
      </div>
    </div>
  );
};

export default Chart;
