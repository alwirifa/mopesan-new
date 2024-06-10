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
import DropDown from "@/app/components/Dropdown";
import CheckBoxGroup from "@/app/components/Checkbox";

const sortOptions = [
  { value: "ASC", label: "Tinggi ke rendah" },
  { value: "DESC", label: "Rendah ke tinggi" },
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
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const [totalPages, setTotalPages] = useState<any>({});

  const [categoryFilter, setCategoryFilter] = useState<any[]>([
    { value: "", label: "All" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCheckboxChange = (selectedValues: string[]) => {
    setSelectedCategory(selectedValues.join(","));
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

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, query, startDate, endDate, sort, selectedCategory]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/product-sales?search=${query}&sort=${sort}&page=${currentPage}&limit=${limit}`;
      if (startDate) {
        url += `&start_date=${startDate}`;
      }
      if (endDate) {
        url += `&end_date=${endDate}`;
      }
      if (selectedCategory) {
        url += `&category_ids=${selectedCategory}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responeCategory = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/category`
      );

      const categoryData = responeCategory.data.category_name;

      console.log("tes", categoryData);

      const dataTabel = response.data.data.data;
      const totalPages = response.data.data.total_pages;
      setTotalPages(totalPages);
      setDataTabel(dataTabel);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/params?type=product-sales`
        );
        setCategoryFilter(response.data.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?start_date=${startDate}&end_date=${endDate}&type=product-sales`
    );
  };

  console.log(dataTabel)
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-[42px] font-semibold">Product Sales</h1>
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
            <div className="flex flex-col gap-1 justify-center">
              <label
                htmlFor="selectOption"
                className="text-[14px] font-semibold"
              >
                Total Sales
              </label>
              <DropDown
                sortTitle="Harga: Rendah ke Tinggi"
                onSortChange={handleSortChange}
                sortOptions={sortOptions}
              />
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <label
                htmlFor="selectOption"
                className="text-[14px] font-semibold"
              >
                Category
              </label>
              <CheckBoxGroup
                title="Category"
                options={categoryFilter}
                onSelectionChange={handleCheckboxChange}
              />
              
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <label
                htmlFor="selectOption"
                className="text-[14px] font-semibold"
              >
                Pilih Periode
              </label>
              <DatePickerWithRange onDateChange={handleDateChange} />
            </div>
          </div>
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
