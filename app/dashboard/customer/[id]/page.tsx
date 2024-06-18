"use client";

import React, { useEffect, useState } from "react";
import { getOrderById } from "@/app/api/order";
import { OrderDataById } from "@/app/types/types";
import { formatDate, formatCurrency } from "@/app/lib/formatter";
import Link from "next/link";
import TableItem from "./TableItem";
import TableLog from "./TableLog";
import axios from "axios";
import Image from "next/image";

export default function Home({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
  const [customer, setCustomer] = useState<any>([]);
  const [tableItem, setTabelItem] = useState<any>([]);
  const [tableLog, setTableLog] = useState<any>([]);
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/customers/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomer(response.data.data);
      } catch (err) {
        throw err;
      }
    };

    fetchCustomer();
  }, [params.id]);

  useEffect(() => {
    const fetchTabelItem = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/customer/${params.id}?offset=${offset}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTabelItem(response.data.data);
      } catch (err) {
        throw err;
      }
    };

    fetchTabelItem();
  }, [params.id]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-xl">
        <div className="w-full">
          <Link
            href="/dashboard/customer"
            className="max-w-max rounded-full flex items-center gap-1"
          >
            <img src="/icons/chevron-left.svg" alt="" />
            <p className="text-sm font-semibold text-primary">
              Back to customer list
            </p>
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-[42px]">{customer?.full_name}</h1>
            <p className="italic text-textGray">{customer?.email}</p>
            <p className="italic text-textGray">{customer?.phone_number}</p>
          </div>
          <div className="flex items-end flex-col gap-1">
            <div className="flex gap-2">
              <Image src={"/icons/stamp.svg"} alt="" width={36} height={36} />
              <p className="text-[32px] font-semibold">
                {customer?.stamp_count}/5 Stamps
              </p>
            </div>
            <p className="text-textGray">amount spend this month</p>
            <p className="text-[32px] font-semibold">
              {customer?.monthly_spend_amount &&
                formatCurrency(customer?.monthly_spend_amount)}
            </p>
          </div>
        </div>

        <TableItem params={params} />
        <TableLog params={params} />
      </div>
    </div>
  );
}
