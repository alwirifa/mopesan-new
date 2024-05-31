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

  // Filter data yang tidak kosong
  const filteredData = data.filter(
    (order) =>
      order && Object.values(order).some((val) => val !== null && val !== "")
  );

  return (
    <div>
      {filteredData.length > 0 && (
        <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
                <th className="border-r border-black px-4 py-4 text-center">
                  No.
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Name
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Email
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Phone Number
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Amount Spend this month
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Jumlah Klaim
                </th>
                <th className=" border-black px-4 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((customer, index) => (
                <React.Fragment key={index}>
               <tr key={customer.id} className="hover:bg-gray-100 ">
              <td className="border-t border-r border-black px-4 py-2 font-semibold text-center">
                {index + 1}.
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.full_name}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.email}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.phone_number}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.monthly_spend_amount}{" "}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {customer.rewards_redeemed_count}{" "}
              </td>
              <td className="border-t  border-black px-4 py-2">
                <Link href={`/dashboard/customer/${customer.id}`} className="text-indigo-600 hover:text-indigo-900">
                  View Detail
                </Link>
              
              </td>
            </tr>

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
