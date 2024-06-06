"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Merchant, OrderData } from "@/app/types/types";
import { getMerchantById, getMerchants } from "@/app/api/merhchant";

import { formatCurrency, formatTime } from "@/app/lib/formatter";
import Card from "./Card";
import { Switch } from "@/components/ui/switch";

export default function Home({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;

    selectedMonth?: string;
    selectedYear?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  const [merchant, setMerchant] = useState<any>(null);

  const [hoursData, setHoursData] = useState<Merchant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const merchantsData = await getMerchants();
        setHoursData(merchantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    if (params && params.id) {
      getMerchantById(params.id)
        .then((data) => {
          setMerchant(data);
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    }
  }, [params]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="p-8 rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <Link
              href="/dashboard/merchant"
              className="flex items-center gap-1"
            >
              <img src="/icons/chevron-left.svg" alt="" />
              <p className="text-sm font-semibold text-primary">
                Back to merchant list
              </p>
            </Link>
            <div className="flex flex-col gap-2 items-end translate-y-2">
              <div className="flex gap-4 items-center">
                <p className="text-[#212427]/70  font-semibold">
                  Closed
                </p>
                <Switch />
                <p className="text-primary font-semibold">Open</p>
              </div>
              <div>
                {hoursData
                  .filter(
                    (merchant) =>
                      merchant.operating_hours.merchant_id === Number(params.id)
                  )
                  .map((merchant, index) => (
                    <p key={index} className="text-sm text-textGray italic">
                      Opening Hours:{" "}
                      {formatTime(merchant.operating_hours.opening_hours)} -{" "}
                      {formatTime(merchant.operating_hours.closing_hours)}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          {/* <div>
            <Link href={`/dashboard/merchants/edit/${params.id}`}>EDIT</Link>
          </div> */}
          <h1 className="text-4xl font-semibold">{merchant?.merchant_name}</h1>
          <p className="italic text-textGray">{merchant?.address}</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-2">
                <img src="/icons/merchant/user-circle.svg" alt="" />
                <p className="font-semibold">{merchant?.pic_name}</p>
              </div>
              <div className="flex gap-2">
                <img src="/icons/merchant/phone-call.svg" alt="" />
                <p className="font-semibold">{merchant?.phone_number}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Active Order (Daily)</p>
                <p className="text-xl font-semibold">
                  {merchant?.daily_order_active} Orders
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Order Cancelled (Daily)</p>
                <p className="text-xl text-primary font-semibold">
                  {merchant?.daily_order_cancelled} Orders
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Order Delivered (Daily)</p>
                <p className="text-xl font-semibold">
                  {merchant?.daily_order_delivered} Orders
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Daily Earnings</p>
                <div className="flex gap-1">
                  <p className="text-xs -translate-y-[2px] text-textGray">Rp</p>
                  <p className="text-xl font-semibold">
                    {merchant?.daily_earning &&
                      formatCurrency(merchant?.daily_earning)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-lg h-full relative">
        <Card params={params} />
      </section>
    </div>
  );
}
