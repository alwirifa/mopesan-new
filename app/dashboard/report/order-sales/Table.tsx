"use client";

import { formatCurrency, formatDate } from "@/app/lib/formatter";
import { OrderData } from "@/app/types/types";

import Link from "next/link";
import React from "react";
import { useState } from "react";

type Props = {
  data: OrderData[];
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
      {filteredData.length > 0 && (
        <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-8">
          <table className="w-full">
            <thead>
              <tr className="text-base font-semibold text-left text-gray-900 bg-[#D6D6D6] border-b border-black">
                <th className="border-r border-black px-2 py-4 text-center">
                  No.
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Order ID
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Merchant Name
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Amount Spent
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Order Type
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Payment Method
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Status
                </th>
                <th className=" border-black px-6 py-4 text-left">...</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((order, index) => (
                <tr className="hover:bg-gray-100" key={index}>
                  <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.payment.order_uid}{" "}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.merchant_name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order?.final_amount && formatCurrency(order?.final_amount)}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.order_type}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.payment.payment_method}{" "}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order.order_status}{" "}
                  </td>

                  <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
                    <Link
                      href={`/dashboard/report/order-sales/${order.payment.id}`}
                      className="px-4 py-2 rounded-lg text-sm text-white bg-primary"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
