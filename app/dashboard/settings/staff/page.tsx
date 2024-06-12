"use client";

import React, { useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCurrency, formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Search from "@/app/components/Search";
import Image from "next/image";
import { UserContext } from "@/app/context/UserContext";
import { useSearchParams } from "next/navigation";

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
  const [dataTabel, setDataTabel] = useState<any[]>([]);
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
  const queryParams = useSearchParams();
  const query = queryParams.get("query") || "";
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 10;

  // const offset = (currentPage - 1) * limit;
  const [totalPages, setTotalPages] = useState<any>({});

  useEffect(() => {
    handleSave();
  }, [currentPage, query, sort, currentPage]);

  const { user } = useContext(UserContext);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/staffs?search=${query}&sort=${sort}&page=${currentPage}&limit=${limit}`;
      if (startDate) {
        url += `&start_date=${startDate}`;
      }
      if (endDate) {
        url += `&end_date=${endDate}`;
      }
      
      if (user.role_keyword === "admin_merchant") {
        url += `&merchant_id=${user.merchant_id}`;
      }


      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataTabel = response.data.data.response_staff;
      const pages = response.data.data.total_page;
      setTotalPages(pages);
      console.log("pages", pages);
      console.log("data tabel", dataTabel);
      setDataTabel(dataTabel);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };


  const handleDownload = () => {
    // Lakukan pengunduhan
    window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?start_date=${startDate}&end_date=${endDate}&type=staff-report`);
  };


  return (
    <div className="">
    <div className="flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Staff List</h1>
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
          {/* <div className="flex gap-4 items-center">
            <DatePickerWithRange onDateChange={handleDateChange} />
            <button
              onClick={handleSave}
              className="px-4 py-3 rounded-lg text-white bg-primary "
            >
              Terapkan
            </button>
          </div> */}
          {/* <Sort onSortChange={handleSortChange} />{" "} */}
          <Search placeholder="Search ..." />
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
