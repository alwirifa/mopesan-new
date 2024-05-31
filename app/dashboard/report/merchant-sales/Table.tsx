"use client";

import { formatCurrency, formatDate } from "@/app/lib/formatter";

import React, { useState } from "react";

type Props = {
  data: any[];
};

const Table: React.FC<Props> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Filter data yang tidak kosong
  const filteredData = data.filter(
    (order) =>
      order && Object.values(order).some((val) => val !== null && val !== "")
  );

  return (
    <div>
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-8">
        <table className="w-full">
          <thead>
            <tr className="text-base font-semibold text-left text-gray-900 bg-[#D6D6D6] border-b border-black">
              <th className="border-r border-black px-2 py-4 text-center">
                No.
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Merchant Name
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Total Transaction
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Total Sales
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Item Sold
              </th>

              <th className=" border-black px-6 py-4 text-left">...</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-100" key={index}>
                  <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.merchant_name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.total_transactions}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {/* {order?.final_amount && formatCurrency(order?.final_amount)} */}
                    {order?.total_sales && formatCurrency(order.total_sales)}
                  </td>

                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.total_item_sold}
                  </td>

                  <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() =>
                        setExpandedRow(expandedRow === index ? null : index)
                      }
                      className="px-4 py-2 rounded-lg text-sm text-white bg-primary"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr className="bg-[#E7E7E7]">
                    <td
                      colSpan={6}
                      className="px-24 py-4 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <p className="font-semibold">Total Sales</p>
                          <span>  {order?.total_sales && formatCurrency(order.total_sales)}</span>
                        </div>
                        <div className="flex gap-2">
                          <p className="font-semibold">Total Taxes</p>
                          <span>  {order?.total_taxes && formatCurrency(order.total_taxes)}</span>
                        </div>
                        <div className="flex gap-2">
                          <p className="font-semibold">Total Item Sold</p>
                          <span>{order?.total_item_sold} </span>{" "}
                        </div>
                        <div className="flex gap-2">
                          <p className="font-semibold">Total Transactions</p>
                          <span>{order?.total_transactions}</span>{" "}
                        </div>
                      </div>
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
