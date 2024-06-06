"use client";

import { formatCurrency, formatDate } from "@/app/lib/formatter";
import { OrderData } from "@/app/types/types";

import Link from "next/link";
import React from "react";
import { useState } from "react";

type Props = {
  data: any[];
};

const Table: React.FC<Props> = ({ data }: Props) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if ( data === null) {
    return <div>data kosong</div>;
  }

  return (
    <div>
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
        <table className="w-full">
          <thead>
            <tr className="text-base font-semibold text-left text-gray-900 bg-[#D6D6D6] border-b border-black">
              <th className="border-r border-black px-2 py-4 text-center">
                No.
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Id Order
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Merchant Location
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Order Time
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Order Type
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Amount
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Payment Method
              </th>
              <th className=" border-black px-6 py-4 text-left">status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sales, index) => (
              <tr className="hover:bg-gray-100" key={index}>
                <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {sales?.order_id}
                </td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {sales?.merchant_name}
                </td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {sales?.order_time && formatDate(sales?.order_time)}
                </td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap capitalize">
                  {sales?.order_type.replace("-", " ") || ""}
                </td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {sales?.amount && formatCurrency(sales?.amount)}
                </td>
                <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {sales?.payment_method}
                </td>

                <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap capitalize">
                  {sales?.status.replace("-", " ") || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
