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
import Search from "@/app/components/Search";

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
  const [tabelData, setTabelData] = useState<any[]>([]);
  const [taxData, setTaxData] = useState<any>({});
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [startDate, setStartDate] = useState<string>(
    formatDateRange(defaultStartDate.toISOString())
  );
  const [endDate, setEndDate] = useState<string>(
    formatDateRange(defaultEndDate.toISOString())
  );
  const [sort, setSort] = useState("ASC");
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  // const offset = (currentPage - 1) * limit;
  const [totalPages, setTotalPages] = useState<any>({});

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, sort, startDate, endDate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/tax-report?sort=${sort}&page=${currentPage}&limit=${limit}`;
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

      const dataTabel = response.data.data.second_data;

      const data = response.data.data.first_data;
      const page = response.data.data.total_pages
      setTotalPages(page);

      console.log(dataTabel);
      setTabelData(dataTabel);
      console.log("total page", page);
      setTaxData(data);
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?start_date=${startDate}&end_date=${endDate}&type=tax-sales`
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Tax Sales</h1>
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
          {/* <Sort onSortChange={handleSortChange} />{" "} */}
          <div className="flex gap-4 items-center">
            <DatePickerWithRange onDateChange={handleDateChange} />
            {/* <button
              onClick={handleSave}
              className="px-4 py-3 rounded-lg text-white bg-primary "
            >
              Terapkan
            </button> */}
          </div>
          <Search placeholder="Search ..."/>
        </div>
        {/* =====================  DATA CARD  ====================== */}
        <div className="flex gap-4">
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Transaction</p>
            <p className="text-xl font-semibold ">
              {taxData?.total_transactions} Orders
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Sales</p>
            <p className="text-xl font-semibold text-green-900">
              {taxData?.total_sales && formatCurrency(taxData?.total_sales)}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Service Fee</p>
            <p className="text-xl font-semibold  text-green-900">
              {taxData?.total_service_fee &&
                formatCurrency(taxData.total_service_fee)}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Tax</p>
            <p className="text-xl font-semibold  text-green-900">
              {taxData?.total_taxes && formatCurrency(taxData.total_taxes)}
            </p>
          </div>
        </div>
        {/* =====================  TABLE  ====================== */}
        <Table data={tabelData} />
        <div className="w-full flex justify-end mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;
