// Table.tsx

import { formatCurrency } from "@/app/lib/formatter";
import { OrderData } from "@/app/types/types";
import Link from "next/link";
import React from "react";

type Props = {
  data: OrderData[];
};

const Table: React.FC<Props> = ({ data }) => {
  const totalFinalAmount = data.reduce(
    (total, order) => total + order.final_amount,
    0
  );
  const totalOrders = data.length;

  // Menampilkan pesan "Tidak ada data" jika data kosong
  if (data.length === 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="">Data Merchant order tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
        <table className="w-full">
          <thead>
            <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100 border-b border-black">
              <th className="border-r border-black px-2 py-4 text-center">
                No.
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Order ID
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Order Type
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Amount Spent
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Payment Method
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Status
              </th>
              <th className="border-black px-6 py-4 text-left">...</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                  {index + 1}.
                </td>
                <td className="py-2 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.order_lengkap_id}
                </td>
                <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.order_type?.replace("-", "") || ""}
                </td>
                <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.final_amount && formatCurrency(order?.final_amount)}
                </td>
                <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.payment.payment_method}
                </td>
                <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.order_status?.replace("-", " ") || ""}
                </td>
                <td className="py-4 px-6 font-medium border-t border-black text-gray-900 whitespace-nowrap">
                  <Link
                    href={`/dashboard/report/order-sales/${order.payment.id}`}
                    className="px-4 py-2 text-white font-semibold text-sm bg-primary rounded-lg"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
