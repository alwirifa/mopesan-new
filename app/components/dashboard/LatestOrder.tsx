"use client";

import { getOrder } from "@/app/api/order";
import { OrderData } from "@/app/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

export const LatestOrder: React.FC<Props> = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrder();
        const latestOrders = response.slice(-10).reverse(); // Get the last 10 orders and reverse them to show the latest first
        setOrders(latestOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
      <table className="w-full">
        <thead>
          <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100 border-b border-black">
            <th className="border-r border-black px-4 py-4 text-center">No.</th>
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
              Payment Method
            </th>
            <th className="border-r border-black px-6 py-4 text-left">
              Status
            </th>
            <th className="border-black px-6 py-4 text-left">Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                {index + 1}.
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {order.payment.order_uid}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {order.merchant_name}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {order.final_amount}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {order.payment.payment_method}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                {order.order_status}
              </td>
              <td className="py-4 px-6 text-sm font-medium border-t border-black text-gray-900 whitespace-nowrap">
                <Link
                  href={`/dashboard/order/${order.payment.id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestOrder;
