"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCurrency, formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Search from "@/app/components/Search";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
  const [dataTabel, setDataTabel] = useState<any[]>([]);

  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const queryParams = useSearchParams();
  const query = queryParams.get("query") || "";
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 10;

  const [totalPages, setTotalPages] = useState<any>({});

  useEffect(() => {
    handleSave();
  }, [currentPage, query, sort, currentPage]);

  console.log(currentPage);
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers?sort=${sort}&page=${currentPage}&limit=${limit}&search=${query}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataTabel = response.data.data.customers;
      const pages = response.data.data.total_pages;
      setTotalPages(pages);
      setDataTabel(dataTabel);

      console.log(pages);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleSortChange = (selectedSort: string) => {
    setSort(selectedSort);
  };

  const handleDownload = () => {
    // Lakukan pengunduhan
    window.open(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?type=customer`
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Customer List</h1>
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
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
          </div>
          <Search placeholder="Search ..." />
        </div>
        {/* <Sort onSortChange={handleSortChange} />{" "} */}
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
