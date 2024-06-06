"use client";

import { formatCurrency, formatDate } from "@/app/lib/formatter";
import { OrderData } from "@/app/types/types";

import Link from "next/link";
import React from "react";
import { useState } from "react";

type Props = {};

const Table: React.FC<Props> = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-8">
      <table className="w-full">
        <thead>
          <tr className="text-base font-semibold text-left text-gray-900 bg-[#D6D6D6] border-b border-black">
            <th className="border-r border-black px-2 py-4 text-center">No.</th>
            <th className="border-r border-black px-6 py-4 text-left">
              Merchnat Name
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Location
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Perfomance
            </th>
            <th className=" border-black px-6 py-4 text-left">Earnings</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">1</td>
            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>
            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>
            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap"></td>

            <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
            
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;