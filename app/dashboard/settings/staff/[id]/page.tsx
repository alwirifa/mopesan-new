"use client";

import React, { useEffect, useState } from "react";
import { getOrderById } from "@/app/api/order";
import { OrderDataById } from "@/app/types/types";
import { formatDate, formatCurrency } from "@/app/lib/formatter";
import Link from "next/link";
import axios from "axios";
import Table from "./Table";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
  const queryParams = useSearchParams();
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/staffs/${params.id}?`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        setCustomer(data);
      } catch (err) {
        throw err;
      }
    };

    fetchCustomer();
  }, [params.id]);

  const handleDownload = () => {
    // Lakukan pengunduhan
    window.open(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?type=staff-attendance&staff_id=${params.id}`
    );
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-xl">
        <div className="w-full">
          <Link
            href="/dashboard/settings/staff"
            className="max-w-max rounded-full flex items-center gap-1"
          >
            <img src="/icons/chevron-left.svg" alt="" />
            <p className="text-sm font-semibold text-primary">
              Back to staff list
            </p>
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-[42px] font-semibold">{customer?.full_name}</h1>
            <p className="italic text-textGray">E-Mail: {customer?.email}</p>
            <p className="italic text-textGray">
              No-Telp: {customer?.phone_number}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 w-full ">
            {/* <div className="border-b border-textGray max-w-xs w-full text-end pb-1">
              <p className="text-[32px] font-semibold">merhant</p>
              <p className="text-end text-textGray text-sm">Opening hours</p>
            </div> */}
            <div>
              <p className="text-end text-textGray text-sm">Role</p>
              <p className="text-end text-[32px] font-semibold">
                {customer?.job_title}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white p-6 rounded-lg">
          <div className="w-full flex justify-end">
            <div
              className="px-4 pr-6 py-2 border max-w-max rounded-lg text-sm font-semibold bg-primary text-white flex gap-2"
              onClick={handleDownload}
            >
              <Image
                src={"/icons/download.svg"}
                height={24}
                width={24}
                alt="download"
              />
              <button className="">Download Report</button>
            </div>
          </div>
          <Table params={params} />
        </div>
      </div>
    </div>
  );
}
