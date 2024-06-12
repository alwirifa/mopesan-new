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
import Image from "next/image";
import NotifModal from "@/app/components/modal/notif/NotifModal";
import { useNotifModal } from "@/app/hooks/notif/useNotifModal";
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
  const [notifTabel, setNotifTabel] = useState<any[]>([]);
  const [notifData, setNotifData] = useState<any>({});
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

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    handleSave();
  }, [currentPage, startDate, endDate, query]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/events?sort=${sort}&page=${currentPage}&limit=${limit}&search=${query}`;
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

      const totalPages = response.data.data.total_pages;

      const dataCard = response.data.data.events;
      // setNotifData(data);
      setNotifTabel(dataCard);
      setTotalPages(totalPages);
      // console.log(dataCard);
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
    // Lakukan pengunduhan
    window.open(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?type=notification`
    );
  };

  const notifModal = useNotifModal();

  return (
    <div className="">
      <Heading
        title="Promotional Notifications"
        subtitle="List of all notifications"
        buttonTitle="+ Blast Notification"
        onButtonClick={notifModal.onOpen}
      />
      <div className="h-full w-full mt-8 p-8 bg-white rounded-lg flex flex-col gap-4">
        {/* =====================  PENGATURAN  ====================== */}
        <div className="w-full flex justify-between">
          <div className="flex gap-4 items-center">
            <DatePickerWithRange onDateChange={handleDateChange} />
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
          <Search placeholder="Search ..." />
        </div>
        {/* <Sort onSortChange={handleSortChange} />{" "} */}
        {/* =====================  TABLE  ====================== */}
        <Table data={notifTabel} />
        <div className="w-full flex justify-end mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
      <NotifModal />
    </div>
  );
};

export default Page;
