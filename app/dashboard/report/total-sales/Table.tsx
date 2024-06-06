"use client";

import { formatCurrency, formatDate } from "@/app/lib/formatter";
import { OrderData } from "@/app/types/types";

import Link from "next/link";
import React from "react";
import { useState } from "react";

type Props = {
  data: OrderData[];
};

const Table: React.FC<Props> = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

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
                Payment Method
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Status
              </th>
              <th className=" border-black px-6 py-4 text-left">...</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border-t border-r border-black px-4 py-2 font-medium text-center"></td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>

              <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
