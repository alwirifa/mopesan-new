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
  const [sort, setSort] = useState("ASC");
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, query]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/merchant/${params.id}/between?&search=${query}&sort=${sort}&page=${offset}&limit=${limit}`;
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

      setData(data);

      console.log(response.data);
      setDataTabel(dataTabel);
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

  return (
    <div className="">
      {/* =====================  PENGATURAN  ====================== */}
      <div className="w-full flex justify-between">
        <div>
          <h1 className="text-[24px]">Order History</h1>
          <p className="italic text-textGray">showing data from: {startDate} - {endDate}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Sort onSortChange={handleSortChange} />{" "}
          <DatePickerWithRange onDateChange={handleDateChange} />
          <button
            onClick={handleSave}
            className="px-4 py-3 rounded-lg text-white bg-primary "
          >
            Terapkan
          </button>
        </div>
        {/* <Search placeholder="Search ..." /> */}
      </div>

      {/* =====================  CARD  ====================== */}
      <div className="flex gap-4 mt-4">
        <div className="p-2 rounded-md border w-full flex-1 flex flex-col gap-2">
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
          <p className="text-xl font-semibold">{dataTabel?.tax_estimation}</p>
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
      <div className="w-full flex justify-end mt-4">
        <Pagination totalPages={Math.ceil(dataTabel.total_pages / limit)} />
      </div>
    </div>
  );
};

export default Card;
