"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type NumberData = {
  daily_earning: number;
  daily_order_active: number;
  daily_order_delivered: number;
};



const OrderDataComponent: React.FC = () => {
  const [orderData, setOrderData] = useState<NumberData | null>(null);

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

        // console.log("Response from server:", response.data.data.admin_daily);

        setOrderData(response.data.data.admin_daily);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  // Format daily earning to Indonesian Rupiah (IDR)
  const formattedDailyEarning = orderData.daily_earning
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    .slice(3)
    .slice(0, -3);

  return (
    <div>
      <div className="grid grid-cols-3 gap-8">
        <div className="p-4  rounded-md bg-white relative">
          <p className="text-sm text-textGray">Daily Earnings</p>
          <img
            src="/icons/discount-2.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <div className="mt-10 flex gap-2">
            <p className="text-sm text-textGray -translate-y-1">Rp</p>
            <p className="text-3xl font-medium">{formattedDailyEarning}</p>
          </div>
        </div>
        <div className="p-4 rounded-md bg-white relative">
          <p className="text-xs text-textGray">Total Active Order</p>
          <img
            src="/icons/pizza.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <p className="mt-10 text-3xl font-medium">{orderData.daily_order_active} Orders</p>
        </div>
        <div className="p-4  rounded-md bg-white relative">
          <p className="text-xs text-textGray">Finished Order (Today)</p>
          <img
            src="/icons/shield-check.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <p className="mt-10 text-3xl font-medium">{orderData.daily_order_delivered} Orders</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDataComponent;
