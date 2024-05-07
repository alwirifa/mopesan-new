"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MerchantsOrder from "@/app/ui/dashboard/merchants/merchantsOrder/MerchantOrder";
import MerchantOrder from "@/app/ui/dashboard/merchants/merchantsOrder/MerchantOrder";

type Merchant = {
  id: number;
  merchant_name: string;
  location_lat: number;
  location_long: number;
  address: string;
  pic_name: string;
  email: string;
  phone_number: string;
  monthly_earning: number;
  total_monthly_order: number;
  staff_scheduled_id: number;
  total_daily_order: number;
  daily_order_cancelled: number;
  daily_order_delivered: number;
  daily_order_active: number;
  daily_earning: number;
  created_at: string;
  updated_at: string;
};

const page = ({ params }: { params: { id: string } }) => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);

  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          throw new Error("Admin token not found");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/merchants/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        setMerchant(data);
      } catch (error) {
        console.error("Error fetching merchant:", error);
      }
    };

    fetchMerchant();
  }, []);

  if (!merchant) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="p-6 rounded-md bg-white">
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/merchants"
              className="flex items-center gap-1"
            >
              <img src="/icons/backButton.svg" alt="" />
              <p className="text-sm font-semibold text-textRed">
                Back to merchant list
              </p>
            </Link>
            <h1 className="text-4xl font-semibold">{merchant.merchant_name}</h1>
            <p className="italic text-textGray">{merchant.address}</p>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{merchant.pic_name}</p>
                <p className="font-semibold">{merchant.phone_number}</p>
              </div>
              <div className="flex gap-2">
                <div className="p-4 border rounded-md flex flex-col gap-2">
                  <p className="text-sm text-textGray">Active Order (Daily)</p>
                  <p className="text-xl font-semibold">
                    {merchant.daily_order_active}
                  </p>
                </div>
                <div className="p-4 border rounded-md flex flex-col gap-2">
                  <p className="text-sm text-textGray">
                    Order Cancelled (Daily)
                  </p>
                  <p className="text-xl text-textRed font-semibold">
                    {merchant.daily_order_cancelled}
                  </p>
                </div>
                <div className="p-4 border rounded-md flex flex-col gap-2">
                  <p className="text-sm text-textGray">
                    Order Delivered (Daily)
                  </p>
                  <p className="text-xl font-semibold">
                    {merchant.daily_order_delivered}
                  </p>
                </div>
                <div className="p-4 border rounded-md flex flex-col gap-2">
                  <p className="text-sm text-textGray">Daily Earnings</p>
                  <div className="flex gap-1">
                    <p className="text-xs -translate-y-[2px] text-textGray">
                      Rp
                    </p>
                    <p className="text-xl font-semibold">
                      {merchant.daily_earning}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 rounded-md bg-white">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Order History</h1>
              <p className="italic text-sm text-textGray">
                showing data from:{" "}
              </p>
            </div>
            <div>
              <input type="date" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-2 rounded-md border w-full flex-1 flex flex-col gap-2">
              <p className="text-sm text-textGray">Monthly Earnings</p>
              <p className="text-xl font-semibold">
                {merchant.monthly_earning}
              </p>
            </div>
            <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
              <p className="text-sm text-textGray">Total Orders</p>
              <p className="text-xl font-semibold">
                {merchant.total_monthly_order} Orders
              </p>
            </div>
          </div>
          <MerchantOrder />
        </div>
      </div>
    </div>
  );
};

export default page;
