"use client";

import { UserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

type NumberData = {
  daily_earning: number;
  daily_order_active: number;
  daily_order_delivered: number;
  daily_merchant_active: number;
};

const OrderCard: React.FC = () => {
  const [orderData, setOrderData] = useState<NumberData | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/orders`;

        if (user.role_keyword === "admin_merchant") {
          url += `?merchant_id=${user.merchant_id}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrderData(response.data.data.admin_daily);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);


  if (!orderData) {
    return (
      <div className="grid grid-cols-4 gap-8">
        <div className="p-4 rounded-md bg-white relative shadow-custom">
          <p className="text-sm text-textGray">Total Active Order</p>
          <img
            src="/icons/dashboard/totalActive.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <p className="mt-10 text-3xl font-medium">0 Orders</p>
        </div>
        <div className="p-4 rounded-md bg-white relative shadow-custom">
          <p className="text-sm text-textGray">Finished Order (Today)</p>
          <img
            src="/icons/dashboard/finishedOrder.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <p className="mt-10 text-3xl font-medium">0 Orders</p>
        </div>
        <div className="p-4 rounded-md bg-white relative shadow-custom">
          <p className="text-sm text-textGray">Daily Earnings</p>
          <img
            src="/icons/dashboard/dailyEarning.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <div className="mt-10 flex gap-2">
            <p className="text-sm text-textGray -translate-y-1">Rp</p>
            <p className="text-3xl font-medium">0</p>
          </div>
        </div>
        <div className="p-4 rounded-md bg-white relative shadow-custom">
          <p className="text-sm text-textGray">Active merchant</p>
          <img
            src="/icons/dashboard/activeMerchant.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <p className="mt-10 text-3xl font-medium flex gap-2 items-center">
            0{" "}
            <span className="text-base text-textGray font-normal italic">
              (Merchants)
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Format daily earning to Indonesian Rupiah (IDR)
  const formattedDailyEarning = orderData.daily_earning
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    .slice(3)
    .slice(0, -3);

  const isAdminMerchant = user?.role_keyword === "admin_merchant";

  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="p-4 rounded-md bg-white relative shadow-custom">
        <p className="text-sm text-textGray">Total Active Order</p>
        <img
          src="/icons/dashboard/totalActive.svg"
          alt=""
          className="absolute top-0 right-0"
        />
        <p className="mt-10 text-3xl font-medium">
          {orderData.daily_order_active} Orders
        </p>
      </div>
      <div className="p-4 rounded-md bg-white relative shadow-custom">
        <p className="text-sm text-textGray">Finished Order (Today)</p>
        <img
          src="/icons/dashboard/finishedOrder.svg"
          alt=""
          className="absolute top-0 right-0"
        />
        <p className="mt-10 text-3xl font-medium">
          {orderData.daily_order_delivered} Orders
        </p>
      </div>
      <div className="p-4 rounded-md bg-white relative shadow-custom">
        <p className="text-sm text-textGray">Daily Earnings</p>
        <img
          src="/icons/dashboard/dailyEarning.svg"
          alt=""
          className="absolute top-0 right-0"
        />
        <div className="mt-10 flex gap-2">
          <p className="text-sm text-textGray -translate-y-1">Rp</p>
          <p className="text-3xl font-medium">{formattedDailyEarning}</p>
        </div>
      </div>
      {!isAdminMerchant && (
        <div className="p-4 rounded-md bg-white relative shadow-custom">
          <p className="text-sm text-textGray">Active merchant</p>
          <img
            src="/icons/dashboard/activeMerchant.svg"
            alt=""
            className="absolute top-0 right-0"
          />
          <p className="mt-10 text-3xl font-medium flex gap-2 items-center">
            {orderData.daily_merchant_active}{" "}
            <span className="text-base text-textGray font-normal italic">
              (Merchants)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
