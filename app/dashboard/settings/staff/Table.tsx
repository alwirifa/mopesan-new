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

  if (data == null || data === undefined) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div>
        <p className="text-gray-500 mt-4">Tidak ada data yang tersedia.</p>
      </div>
    );
  }

  return (
    <div>
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
              <th className="border-r border-black px-6 py-4 text-left">NIK</th>
              <th className="border-r border-black px-6 py-4 text-left">
                Phone Number
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Role
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Merchant Location
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Last Login
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Total Working Hours
              </th>
              <th className=" border-black px-4 py-4 text-left">...</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer, index) => (
              <React.Fragment key={index}>
                <tr key={customer.id} className="hover:bg-gray-100 ">
                  <td className="border-t border-r border-black px-4 py-2 font-semibold text-center">
                    {index + 1}.
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {customer.full_name}{" "}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {customer?.nik === ""
                      ? "-"
                      : customer?.nik
                    }
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {customer.phone_number}{" "}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {customer?.job_title}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {customer?.merchant_name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {customer?.last_login === "-"
                      ? "-"
                      : formatDate(customer?.last_login)}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {customer?.total_working_hours}
                  </td>
                  <td className="border-t  border-black px-4 py-2">
                    <Link
                      href={`/dashboard/settings/staff/${customer.id}`}
                      className="px-4 py-2 rounded-lg text-sm text-white bg-primary"
                    >
                     Detail
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
