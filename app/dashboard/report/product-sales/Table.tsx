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

  // Check if data is null or undefined, if so, return null
  if (data == null || data === undefined) {
    return null;
  }

  // Filter data yang tidak kosong
  const filteredData = data.filter(
    (order) =>
      order && Object.values(order).some((val) => val !== null && val !== "")
  );

  // Jika tidak ada data yang tersedia, tampilkan pesan
  if (filteredData.length === 0) {
    return (
      <div>
        <p className="text-gray-500 mt-4">Tidak ada data yang tersedia.</p>
      </div>
    );
  }

  return (
    <div>
      {filteredData.length > 0 && (
        <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-base font-semibold text-left text-gray-900 bg-[#D6D6D6] border-b border-black">
                <th className="border-r border-black px-2 py-4 text-center">
                  No.
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Product Name
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Category
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Price/Item
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Total Sold
                </th>
                <th className="px-6 py-4 text-left">Total Sales</th>
                {/* <th className=" border-black px-6 py-4 text-left">...</th>
                 */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((order, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-gray-100">
                    <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.product_name}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.category_name}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.price && formatCurrency(order?.price)}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {order?.total_sold}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t  border-black text-gray-900 whitespace-nowrap">
                      {order?.total_sales && formatCurrency(order?.total_sales)}
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
                        colSpan={7}
                        className="px-32 py-4 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <p className="font-semibold">Total Transaksi</p>
                            {order?.final_amount &&
                              formatCurrency(order?.final_amount)}
                          </div>
                          <div className="flex gap-2">
                            <p className="font-semibold">Penjualan</p>
                            {order?.total_quantity}
                          </div>

                          <div className="flex gap-2">
                            <p className="font-semibold">Pajak</p>
                            {order?.additional_fees &&
                              order.additional_fees.map(
                                (fee: { name: string; amount: number }) => {
                                  if (fee.name === "Pajak") {
                                    return formatCurrency(fee.amount);
                                  }
                                  return null;
                                }
                              )}
                          </div>
                          <div className="flex gap-2">
                            <p className="font-semibold">Service Fee</p>
                            {order?.additional_fees &&
                              order.additional_fees.map(
                                (fee: { name: string; amount: number }) => {
                                  if (fee.name === "Biaya Penanganan") {
                                    return formatCurrency(fee.amount);
                                  }
                                  return null;
                                }
                              )}
                          </div>
                        </div>
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
      )}
      {filteredData.length === 0 && (
        <p className="text-gray-500 mt-4">Tidak ada data yang tersedia.</p>
      )}
    </div>
  );
};

export default Table;
