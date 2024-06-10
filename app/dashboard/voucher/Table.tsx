"use client";

import { formatCurrency } from "@/app/lib/formatter";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

type Props = {
  data: any[];
};

const Table: React.FC<Props> = ({ data }) => {

  if (!data) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin size-12 text-primary" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1>Tidak ada data voucher</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
        <table className="w-full">
          <thead>
            <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100 border-b border-black">
              <th className="border-r border-black px-4 py-4 text-center">No.</th>
              <th className="border-r border-black px-6 py-4 text-left">Voucher Name</th>
              <th className="border-r border-black px-6 py-4 text-left">Deskripsi</th>
              <th className="border-r border-black px-6 py-4 text-left">Jenis Potongan</th>
              <th className="border-r border-black px-6 py-4 text-left">Besar Potongan</th>
              <th className="border-r border-black px-6 py-4 text-left">Minimal Pembelian</th>
              <th className="border-black px-4 py-4 text-left">Maksimal Potongan</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((voucher, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-gray-100">
                    <td className="border-t border-r border-black px-4 py-2 font-semibold text-center">{index + 1}.</td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.voucher_name}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.description}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.type_voucher}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher?.type_voucher === "percentage" ? `${voucher?.value}%` : voucher?.value && formatCurrency(voucher?.value)}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.minimum_order && formatCurrency(voucher?.minimum_order)}
                    </td>
                    <td className="border-t border-black px-4 py-2">{voucher.max_discount && formatCurrency(voucher?.max_discount)}</td>
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
