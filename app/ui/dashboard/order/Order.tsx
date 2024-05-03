"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";

type activeOrderData = {
  order_pesan_id: number;
  total_quantity: number;
  merchant_name: string;
  order_status: string;
};

const Order = () => {
  const [activeOrders, setActiveOrders] = useState<activeOrderData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response from server:", response.data.data.active_orders);

        setActiveOrders(response.data.data.active_orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (activeOrders.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-md p-6 h-full">
      <h1 className="text-2xl font-semibold">Active Orders</h1>
      <table className="table-auto w-full mt-4 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-base font-semibold">No.</th>
            <th className="border px-4 py-2 text-base font-semibold">
              Order ID
            </th>
            <th className="border px-4 py-2 text-base font-semibold">
              Jumlah Item
            </th>
            <th className="border px-4 py-2 text-base font-semibold">
              Merchant
            </th>
            <th className="border px-4 py-2 text-base font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {activeOrders.map((order, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-base ">{index + 1}</td>
              <td className="border px-4 py-2 text-base ">{order.order_pesan_id}</td>
              <td className="border px-4 py-2 text-base ">{order.total_quantity}</td>
              <td className="border px-4 py-2 text-base ">{order.merchant_name}</td>
              <td className="border px-4 py-2 text-base ">{order.order_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
