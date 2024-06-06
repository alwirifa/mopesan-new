"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatCurrency, formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";

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
  const [periodicData, setPeriodicData] = useState<any>({});
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
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    handleSave();
  }, [searchParams?.page]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/between?sort=${sort}&offset=${offset}&limit=${limit}`;
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

      const dataCard = response.data.data.orders;
      setPeriodicData(data);
      setDataCard(dataCard);
      console.log(dataCard);
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
      <div className="w-full flex justify-between">
        <h1 className="text-[42px] font-semibold">Total Sales</h1>
        <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
      </div>

      <div className="mt-8 p-8 bg-white rounded-lg">
        <div className="w-full flex gap-8 items-center">
          <div className="flex flex-col gap-1 justify-center">
            <label htmlFor="selectOption" className="text-[14px] font-semibold">
              Urutkan
            </label>
            <select id="selectOption" className="px-2 py-1 border rounded">
              <option value="">Rendah ke Tinggi</option>
              <option value="option1">Opsi 1</option>
              <option value="option2">Opsi 2</option>
              <option value="option3">Opsi 3</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="selectOption" className="text-[14px] font-semibold">
              Durasi
            </label>
            <select id="selectOption" className="px-2 py-1 border rounded">
              <option value="">Pilih Periode</option>
              <option value="option1">Opsi 1</option>
              <option value="option2">Opsi 2</option>
              <option value="option3">Opsi 3</option>
            </select>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="selectOption"
                className="text-[14px] font-semibold"
              >
                Tanggal
              </label>
              <DatePickerWithRange onDateChange={handleDateChange} />
            </div>

            <button
              onClick={handleSave}
              className="px-4 py-[9px] text-sm rounded-lg text-white bg-primary translate-y-3 "
            >
              Terapkan
            </button>
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
              {periodicData?.total_sales &&
                formatCurrency(periodicData?.total_sales)}{" "}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Tax</p>
            <p className="text-xl font-semibold text-green-900">
              {periodicData?.total_tax &&
                formatCurrency(periodicData?.total_tax)}
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Transaction</p>
            <p className="text-xl font-semibold">
              {periodicData.total_transaction} Orders
            </p>
          </div>
          <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
            <p className="text-sm text-textGray">Total Product Sold</p>
            <p className="text-xl font-semibold">
              {periodicData.total_product_sold} Items
            </p>
          </div>
        </div>
        {/* =====================  TABLE  ====================== */}
        <Table data={dataCard} />
        <div className="w-full flex justify-end mt-4">
          <Pagination
            totalPages={Math.ceil(periodicData.total_transaction / limit)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
