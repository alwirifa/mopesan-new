"use client";

import { formatCurrency, formatDate } from "@/app/lib/formatter";
import { Switch } from "@/components/ui/switch";

import React from "react";
import { useState } from "react";

type Props = {
  data: any[];
};

const Table: React.FC<Props> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!data || data.length === 0 || data === null || data === undefined) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="">Data Notif tidak ditemukan</h1>
      </div>
    );
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
                Notification Title
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Deskripsi
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Promotion Type
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Time Blast
              </th>

              <th className=" border-black px-6 py-4 text-left">Switch</th>
            </tr>
          </thead>
          <tbody>
            {data.map((notif, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-100">
                  <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {notif?.name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {notif?.description}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {notif?.condition}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {notif?.time && formatDate(notif?.time)}
                  </td>

                  <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
                    <Switch />
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
