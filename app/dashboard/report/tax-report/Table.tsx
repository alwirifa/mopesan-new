"use client";

import { formatCurrency, formatDate } from "@/app/lib/formatter";
import { OrderData } from "@/app/types/types";

import Link from "next/link";
import React from "react";
import { useState } from "react";

type Props = {
  data: any[];
};

const Table: React.FC<Props> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!data) {
    return (
      <div>
        <h1>Data tidak ditemukan</h1>
      </div>
    )
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
                  Date
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Total Transaction
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Total Sales
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Total Service Fee
                </th>
                <th className=" border-black px-6 py-4 text-left">Total Tax</th>
                {/* <th className=" border-black px-6 py-4 text-left">...</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-gray-100">
                    <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.order_date && formatDate(order?.order_date)}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.total_transactions}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.total_sales && formatCurrency(order?.total_sales)}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.total_service_fee &&
                        formatCurrency(order?.total_service_fee)}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
                      {order?.total_taxes && formatCurrency(order?.total_taxes)}
                    </td>

                    {/* <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
                      <button
                        onClick={() =>
                          setExpandedRow(expandedRow === index ? null : index)
                        }
                        className="px-4 py-2 rounded-lg text-sm text-white bg-primary"
                      >
                        Detail
                      </button>
                    </td> */}
                  </tr>
                  {expandedRow === index && (
                    <tr className="bg-[#E7E7E7]">
                      <td
                        colSpan={6}
                        className="px-32 py-4 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap"
                      >
                        <div className="flex flex-col gap-2">detail</div>
                        {/*  {order?.additional_fees &&
                        order.additional_fees.map(
                          (fee: { name: string; amount: number }) => {
                            if (fee.name === "Pajak") {
                              return formatCurrency(fee.amount);
                            }
                            return null;
                          }
                        )} */}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
     
    </div>
  );
};

export default Table;
