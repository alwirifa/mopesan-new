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
import Heading from "@/app/components/Heading";
import { useVoucherModal } from "@/app/hooks/voucher/useVoucherModal";
import VoucherModal from "@/app/components/modal/voucher/VoucherModal";
import Filter from "@/app/components/Filter";
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

  const [dataTabel, setDataTabel] = useState<any[]>([]);
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, query]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/vouchers?search=${query}&sort=${sort}&offset=${offset}&limit=${limit}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataTabel = response.data.data.vouchers;

      setDataTabel(dataTabel);
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?type=voucher`
    );
  };

  const voucherModal = useVoucherModal();

  const [checkboxFilter, setCheckboxFilter] = useState<any[]>([
    { value: "", label: "All" },
  ]);

  const [selectedCheckboxFilter, setSelectedCheckboxFilter] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/params?type=voucher`
        );
        setCheckboxFilter(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const handleCheckboxChange = (selectedValues: string[]) => {
    setSelectedCheckboxFilter(selectedValues.join(","));
  };

  return (
    <div className="">
      <Heading
        title="Voucher"
        subtitle="List of All Voucher"
        buttonTitle="+ Add Voucherr"
        onButtonClick={voucherModal.onOpen}
      />
      <div className="h-full w-full mt-8 p-8 bg-white rounded-lg flex flex-col gap-4">
        {/* =====================  PENGATURAN  ====================== */}
        <div className="w-full flex justify-between">
          <div className="flex gap-4 items-center">
          
            <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
            <div
              className="px-4 pr-6 py-[7px] border rounded-lg text-sm font-semibold bg-primary text-white flex gap-2"
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
          <Search placeholder="Search ..." />
        </div>
        {/* <Sort onSortChange={handleSortChange} />{" "} */}

        {/* =====================  TABLE  ====================== */}
        <Table data={dataTabel} />
        <div className="w-full flex justify-end mt-4">
          <Pagination totalPages={Math.ceil(dataTabel.length / limit)} />
        </div>
      </div>
      <VoucherModal />
    </div>
  );
};

export default Page;
