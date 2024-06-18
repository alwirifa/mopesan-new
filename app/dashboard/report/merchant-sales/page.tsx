"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCurrency, formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import clsx from "clsx";
import Image from "next/image";

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
  const defaultStartDate = new Date(2024, 0, 20);
  const defaultEndDate = new Date(2024, 4, 10);
  const [dataCard, setDataCard] = useState<any[]>([]);
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [merchantData, setMerchantData] = useState<any>({});
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [startDate, setStartDate] = useState<string>(
    formatDateRange(defaultStartDate.toISOString())
  );
  const [endDate, setEndDate] = useState<string>(
    formatDateRange(defaultEndDate.toISOString())
  );

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, startDate, endDate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/merchant-sales?`;
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

      const data = response.data.data.first_data;
      const dataTabel = response.data.data.second_data;
      setMerchantData(data);
      setDataCard(dataTabel);
    } catch (error) {
      throw error;
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?start_date=${startDate}&end_date=${endDate}&type=merchant-sales`
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Merchant Sales</h1>
        <div
          className="px-4 pr-6 py-2 border rounded-lg text-sm font-semibold bg-primary text-white flex gap-2"
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
          {/* <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
           */}
          <div></div>
          <div className="flex gap-4 items-center">
            <DatePickerWithRange onDateChange={handleDateChange} />
          </div>
        </div>
        {/* =====================  DATA CARD  ====================== */}
        <div className="flex gap-4">
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Sales</p>
            <p className="text-xl font-semibold text-green-900">
              {merchantData?.total_sales &&
                formatCurrency(merchantData?.total_sales)}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Tax</p>
            <p className="text-xl font-semibold text-green-900">
              {merchantData?.total_taxes &&
                formatCurrency(merchantData?.total_taxes)}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Transaction</p>
            <p className="text-xl font-semibold">
              {merchantData.total_transactions}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Product Sold</p>
            <p className="text-xl font-semibold">
              {merchantData.total_merchants}
            </p>
          </div>
        </div>
        {/* =====================  TABLE  ====================== */}
        <Table data={dataCard} />
      </div>
    </div>
  );
};

export default Page;
