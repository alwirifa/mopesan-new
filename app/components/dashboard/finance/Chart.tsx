import React from "react";

import TransactionsChart from "./TransactionsChart";
import { formatCurrency } from "@/app/lib/formatter";
import EarningChart from "./EarningChart";

type Props = {
  dataEarnings: any[];
  dataTransations: any[];
  earning: any;
  transactions: number;
};

const Chart = ({
  dataTransations,
  dataEarnings,
  earning,
  transactions,
}: Props) => {

  return (
    <div className="flex gap-8  ">
      <div className="flex-1 flex flex-col gap-2 bg-white p-6 rounded-lg">
        <h1 className="text-[16px]">Pendapatan Kotor</h1>
        <h2 className="text-[24px] font-semibold">{formatCurrency(earning)}</h2>
        <EarningChart data={dataEarnings} />
      </div>
      <div className="flex-1 flex flex-col gap-2 bg-white p-6 rounded-lg">
        <h1 className="text-[16px]">Total Transaksi Kotor</h1>
        <h2 className="text-[24px] font-semibold">{transactions} Transaksi</h2>
        <TransactionsChart data={dataTransations} />
      </div>
    </div>
  );
};

export default Chart;
