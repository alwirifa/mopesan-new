"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCurrency, formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import Filter from "@/app/components/Filter";

const sortOptions = [
  { value: "ASC", label: "Ascending" },
  { value: "DESC", label: "Descending" },
];

const Page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const defaultStartDate = new Date(2024, 0, 20);
  const defaultEndDate = new Date(2024, 4, 10);
  const [dataCard, setDataCard] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>({});
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [startDate, setStartDate] = useState<string>(
    formatDateRange(defaultStartDate.toISOString())
  );
  const [endDate, setEndDate] = useState<string>(
    formatDateRange(defaultEndDate.toISOString())
  );
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  // const offset = (currentPage - 1) * limit;

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, startDate, endDate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/api/v1/auth/orders/admin/between?sort=${sort}&page=${currentPage}&limit=${limit}&merchant_name=${[
        dataCard.merchant_name,
        dataCard.final_amount,
      ]}`;
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

      const data = response.data.data;

      const dataTabel = response.data.data.orders;
      setTotalPages(data.total_pages);
      setDataCard(dataTabel);
      console.log(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
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

  const handleDownload = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?start_date=${startDate}&end_date=${endDate}&type=order-sales`,
      "_blank"
    );
  };

  return (
    <div className="">
      <div className="w-full flex justify-between items-center relative">
        <Heading title="Orders Sales" subtitle="List of all orders" />
        <div
          className="px-4 pr-6 py-2 border rounded-lg text-sm font-semibold bg-primary text-white flex gap-2 absolute top-6 right-0"
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
      <div className="h-full w-full mt-8 p-8 bg-white rounded-lg flex flex-col gap-4">
        {/* =====================  PENGATURAN  ====================== */}
        <div className="w-full flex justify-between">
          <div className="flex gap-4 items-center">
            <Filter
              onFilterChange={handleSortChange}
              filterOptions={sortOptions}
            />{" "}
            <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
          </div>
          <div className="flex gap-4 items-center">
            <DatePickerWithRange onDateChange={handleDateChange} />
          </div>
        </div>

        {/* =====================  TABLE  ====================== */}
        <Table data={dataCard} />
        <div className="w-full flex justify-end mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;
