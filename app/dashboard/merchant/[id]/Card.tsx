"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCurrency, formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "ASC", label: "Ascending" },
  { value: "DESC", label: "Descending" },
];

const Card = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const defaultStartDate = new Date(2024, 0, 20);
  const defaultEndDate = new Date(2024, 4, 10);
  const [dataTabel, setDataTabel] = useState<any>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [startDate, setStartDate] = useState<string>(
    formatDateRange(defaultStartDate.toISOString())
  );
  const [endDate, setEndDate] = useState<string>(
    formatDateRange(defaultEndDate.toISOString())
  );
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const query = searchParams?.query || "";
  const queryParams = useSearchParams();
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;
  const [data, setData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>([]);

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, query, startDate, endDate, sort, currentPage]);

  console.log(currentPage);
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/merchant/${params.id}/between?sort=${sort}&page=${currentPage}&limit=${limit}`;
      if (startDate) {
        url += `&start_date=${startDate}`;
      }
      if (endDate) {
        url += `&end_date=${endDate}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataTabel = response.data.data;
      const data = response.data.data.orders;

      const page = response.data.data.total_pages;
      setTotalPages(page);
      setData(data);

      console.log(response.data);
      setDataTabel(dataTabel);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleDateChange = (date: DateRange | undefined) => {
    setSelectedDateRange(date);
    if (date?.from) {
      const formattedStartDate = formatDateRange(date.from.toISOString());
      setStartDate(formattedStartDate);
    }
    if (date?.to) {
      const formattedEndDate = formatDateRange(date.to.toISOString());
      setEndDate(formattedEndDate);
    }
  };

  const handleSortChange = (selectedSort: string) => {
    setSort(selectedSort);
  };

  const handleDownload = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?type=merchant-orders&sort?=${sort}&start_date=${startDate}&end_date=${endDate}&merchant_id=${params.id}`
    );
  };

  console.log("page:", currentPage);
  return (
    <div className="">
      {/* =====================  PENGATURAN  ====================== */}
      <div className="w-full flex justify-between">
        <div>
          <h1 className="text-[24px] font-semibold">Order History</h1>
          <p className="italic text-textGray">
            Showing data from: {startDate} - {endDate}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
          <DatePickerWithRange onDateChange={handleDateChange} />
          <div
            className="px-4 pr-6 py-[7px] border rounded-md text-sm font-semibold bg-primary text-white flex gap-2"
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
      </div>

      {/* =====================  CARD  ====================== */}
      <div className="flex gap-4 mt-4">
        <div className="p-4 rounded-md border w-full flex-1 flex flex-col gap-2">
          <p className="text-sm text-textGray">Monthly Earnings</p>
          <p className="text-xl font-semibold">
            {dataTabel?.total_sales && formatCurrency(dataTabel?.total_sales)}
          </p>
        </div>
        <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
          <p className="text-sm text-textGray">Total Orders</p>
          <p className="text-xl font-semibold">{dataTabel?.total_order}</p>
        </div>
        <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
          <p className="text-sm text-textGray">Tax Total (Estimation)</p>
          <p className="text-xl font-semibold">
            {dataTabel?.tax_estimation &&
              formatCurrency(dataTabel?.tax_estimation)}
          </p>
        </div>
        <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
          <p className="text-sm text-textGray">Average Income (Estimation)</p>
          <p className="text-xl font-semibold">
            {dataTabel?.average_income &&
              formatCurrency(dataTabel?.average_income)}
          </p>
        </div>
      </div>
      {/* =====================  TABLE  ====================== */}
      <Table data={data} />
      {data.length > 0 && (
        <div className="w-full flex justify-end mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default Card;