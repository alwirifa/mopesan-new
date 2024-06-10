"use client";

import { useState } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/formatter";
import Card from "./Card";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { useConfirmModal } from "@/app/hooks/confirm/useConfirmModal";

type Props = {
  id: number;
  is_open: boolean;
  merchant_name: string;
  phone_number: string;
  address: string;
  pic_name: string;
  daily_order_active: string;
  daily_order_delivered: string;
  daily_order_cancelled: string;
  daily_earning: number;
};

export default function Content({
  id,
  is_open,
  merchant_name,
  phone_number,
  address,
  pic_name,
  daily_order_active,
  daily_order_delivered,
  daily_order_cancelled,
  daily_earning,
}: Props) {
  const [isActive, setIsActive] = useState(is_open);
  const confirmModal = useConfirmModal();

  const merchantSwitch = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in local storage");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const newIsActive = !isActive;
      setIsActive(newIsActive);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/merchants/switch/${id}`,
        { is_active: newIsActive },
        config
      );
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {}
      <div className="p-8 rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-semibold">{merchant_name}</h1>
              <p className="italic text-textGray">{address}</p>
            </div>

            <div className="flex gap-4 items-center">
              <p className="text-[#212427]/70  font-semibold">Closed</p>
              <Switch checked={isActive} onClick={merchantSwitch} />
              <p className="text-primary font-semibold">Open</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-2">
                <img src="/icons/merchant/user-circle.svg" alt="" />
                <p className="font-semibold">{pic_name}</p>
              </div>
              <div className="flex gap-2">
                <img src="/icons/merchant/phone-call.svg" alt="" />
                <p className="font-semibold">{phone_number}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Active Order (Daily)</p>
                <p className="text-xl font-semibold">
                  {daily_order_active} Orders
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Order Cancelled (Daily)</p>
                <p className="text-xl text-primary font-semibold">
                  {daily_order_cancelled} Orders
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Order Delivered (Daily)</p>
                <p className="text-xl font-semibold">
                  {daily_order_delivered} Orders
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Daily Earnings</p>
                <div className="flex gap-1">
                  <p className="text-xs -translate-y-[2px] text-textGray">Rp</p>
                  <p className="text-xl font-semibold">
                    {daily_earning && formatCurrency(daily_earning)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-lg h-full relative">
        <Card id={id} />
      </section>
      <ConfirmModal />
    </div>
  );
}
