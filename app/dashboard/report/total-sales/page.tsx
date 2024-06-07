"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCurrency, formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import DropDown from "@/app/components/Dropdown";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Image from "next/image";

const sortOptions = [
  { value: "ASC", label: "Rendah ke Tinggi" },
  { value: "DESC", label: "Tinggi Ke Rendah" },
];

const periodOptions = [
  {
    value: "this-day",
    label: "Hari ini",
  },
  {
    value: "this-week",
    label: "Minggu ini",
  },
  {
    value: "this-month",
    label: "Bulan ini",
  },
  {
    value: "this-year",
    label: "Tahun ini",
  },
  {
    value: "",
    label: "Pilih Periode",
  },
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
  const [dataTabel, setDataTabel] = useState<any[]>([]);
  const [firstData, setFirstData] = useState<any>({});
  const [totalPages, setTotalPages] = useState<any>({});

  const defaultStartDate = new Date(2024, 0, 20);
  const defaultEndDate = new Date(2024, 5, 10);
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
  const [periodSort, setPeriodSort] = useState<string>(periodOptions[3].value);
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, startDate, endDate, sort, periodSort]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing");
      }

      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/total-sales?page=${currentPage}&limit=${limit}&merchant_id=3&sort=${sort}&period=${periodSort}`;
      if (startDate) {
        url += `&start_date=${startDate}`;
      }
      if (endDate) {
        url += `&end_date=${endDate}`;
      }

      console.log("Request URL:", url); // Log URL untuk memastikan URL benar
      console.log("Token:", token); // Log token untuk memastikan token tidak hilang

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const firstData = response.data.data.first_data;
      const secondData = response.data.data.second_data;

      setDataTabel(secondData);
      setFirstData(firstData);
      setTotalPages(firstData.total_page);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const handlePeriodChange = (newSort: string) => {
    setPeriodSort(newSort);
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
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/api/v1/export?start_date=${startDate}&end_date=${endDate}&type=total-sales&merchant_id=${3}&period=${periodOptions}&sort=${sort}`
    );
  };

  return (
    <div className="">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Total Sales</h1>
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

      <div className="mt-8 p-8 bg-white rounded-lg">
        <div className="w-full flex gap-8 items-center">
          {/* <div className="flex flex-col gap-1 justify-center">
            <label htmlFor="selectOption" className="text-[14px] font-semibold">
              Merchant
            </label>
            <DropDown
              sortTitle="Pilih Merchant"
              onSortChange={handleSortChange}
              sortOptions={sortOptions}
            />
          </div> */}
          <div className="flex flex-col gap-1 justify-center">
            <label htmlFor="selectOption" className="text-[14px] font-semibold">
              Urutkan
            </label>
            <DropDown
              sortTitle="Harga: Rendah ke Tinggi"
              onSortChange={handleSortChange}
              sortOptions={sortOptions}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="selectOption" className="text-[14px] font-semibold">
              Durasi
            </label>
            <DropDown
              sortTitle="Pilih Periode"
              onSortChange={handlePeriodChange}
              sortOptions={periodOptions}
            />
          </div>
          <div
            className={`flex gap-4 items-center ${
              periodSort ? "hidden" : "flex"
            }`}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="selectOption"
                className="text-[14px] font-semibold"
              >
                Tanggal
              </label>
              <DatePickerWithRange onDateChange={handleDateChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full mt-8 p-8 bg-white rounded-md flex flex-col gap-4">
        {/* =====================  PENGATURAN  ====================== */}

        {/* =====================  DATA CARD  ====================== */}
        <div className="flex gap-4">
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Sales</p>
            <p className="text-xl font-semibold text-green-900">
              {firstData?.total_sales && formatCurrency(firstData?.total_sales)}{" "}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Transaction</p>
            <p className="text-xl font-semibold">
              {firstData.total_transactions} Orders
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Tax</p>
            <p className="text-xl font-semibold text-green-900">
              {firstData?.total_taxes && formatCurrency(firstData?.total_taxes)}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Average Income (Estimation)</p>
            <p className="text-xl font-semibold">
              {firstData?.average_income &&
                formatCurrency(firstData?.average_income)}
            </p>
          </div>
        </div>
        {/* =====================  TABLE  ====================== */}
        <Table data={dataTabel} />
        <div className="w-full flex justify-end mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;
