"use client";

import React, { useContext, useEffect, useState } from "react";
import { getOrderById } from "@/app/api/order";
import { OrderDataById } from "@/app/types/types";
import { formatDate, formatCurrency } from "@/app/lib/formatter";
import Link from "next/link";
import Table from "./Table";
import { UserContext } from "@/app/context/UserContext";

export default function Home({ params }: { params: { id: string } }) {
  const { user } = useContext(UserContext); // useContext used unconditionally

  const [orders, setOrders] = useState<OrderDataById | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params && params.id) {
          const data = await getOrderById(params.id);
          if (data !== null && data !== undefined) {
            setOrders(data);
          }
        }
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, [params]);

  if (!orders) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-xl">
        <div className="w-full">
          {user?.role_keyword === "admin_merchant" ? (
            <Link
              href={`/dashboard/merchant/`}
              className="max-w-max rounded-full flex items-center gap-1"
            >
              <img src="/icons/chevron-left.svg" alt="" />
              <p className="text-sm font-semibold text-primary">
                Back to Merchant
              </p>
            </Link>
          ) : (
            <Link
              href="/dashboard/report/order-sales"
              className="max-w-max rounded-full flex items-center gap-1"
            >
              <img src="/icons/chevron-left.svg" alt="" />
              <p className="text-sm font-semibold text-primary">
                Back to order list
              </p>
            </Link>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-semibold">{orders.payment.order_uid}</p>
            <p className="italic text-sm text-textGray">
              tanggal pemesanan: {formatDate(orders.order_date)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              disabled
              className="px-4 py-2 rounded-full font-semibold text-primary bg-secondary"
            >
              {orders.order_status}
            </button>
            <p className="italic text-textGray text-xs">
              Last Update: {formatDate(orders.order_date)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-textGray">Merchant</p>
          <p className="text-3xl font-semibold">{orders.merchant_name}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-textGray">Customer name</p>
            <p className="text-3xl font-semibold capitalize">
              {orders.customer_name}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-textGray">Subtotal</p>
            <p className="text-3xl font-semibold">
              {formatCurrency(orders.final_amount)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl">
        {/* item yang dipesan */}
        <h1 className="text-2xl font-semibold">Item yang dipesan</h1>
        <p className="text-sm italic text-textGray">Total item: 4 item</p>

        <div className="my-4">
          <Table data={orders} />
        </div>

        {/* ringkasan pembayaran */}
        <h1 className="py-4 text-2xl font-semibold">Ringkasan Pembayaran</h1>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 text-sm">
            <p>Harga</p>
            <p>Pajak</p>
            <p>Biaya Admin</p>
            <p>Biaya Penanganan</p>
            <p className="font-semibold">Subtotal</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <p>{formatCurrency(orders.sub_total_product)}</p>
            <p>
              {formatCurrency(
                orders?.additional_fees?.find((fee) => fee.name === "Pajak")
                  ?.amount ?? 0
              )}
            </p>
            <p>
              {formatCurrency(
                orders?.additional_fees?.find(
                  (fee) => fee.name === "Biaya Admin"
                )?.amount ?? 0
              )}
            </p>
            <p>
              {formatCurrency(
                orders?.additional_fees?.find(
                  (fee) => fee.name === "Biaya Penanganan"
                )?.amount ?? 0
              )}
            </p>
            <p className="font-semibold">
              {formatCurrency(orders.final_amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
