"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Table from "./Table";

import DropDown from "../../Dropdown";
import Chart from "./Chart";
import ReportDetailOrder from "./ReportDetailOrder";

const sortOptions = [
  { value: "ASC", label: "Ascending" },
  { value: "DESC", label: "Descending" },
];

const Finance = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const defaultStartDate = new Date(2024, 0, 20);
  const defaultEndDate = new Date(2024, 4, 10);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [startDate, setStartDate] = useState<string>(
    formatDateRange(defaultStartDate.toISOString())
  );
  const [endDate, setEndDate] = useState<string>(
    formatDateRange(defaultEndDate.toISOString())
  );
  const [dataTabel, setDataTabel] = useState<any>([]);
  const [earning, setEarning] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [merchantData, setMerchantData] = useState<any>([]);
  const [selectedMerchants, setSelectedMerchants] = useState<any>(2);
  const [merchantBox, setMerchantBox] = useState<any>([]);

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, startDate, endDate, selectedMerchants, sort]);

  const handleSave = async () => {
    try {
      setLoading(true); // Start loading indicator

      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/finance-dashboard`;
      if (selectedMerchants) {
        url += `?merchant_id=${selectedMerchants}`;
      }
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
      const earningChart = response.data.data.list_earnings;
      const transactionsChart = response.data.data.list_transaction;

      setEarning(earningChart);
      setTransactions(transactionsChart);
      setData(data);
      setDataTabel(data.merchant_sales);

      setLoading(false); // Stop loading indicator
    } catch (error) {
      console.error("data error:", error);
      setLoading(false); // Stop loading indicator on error
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/params?type=order-sales`
        );
        const data = response.data.data;

        console.log("Merchants:", data.merchants);
        setMerchantBox(data.merchants);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(merchantBox)

  const handleSelectedMerchant = (newSort: string) => {
    setSelectedMerchants(newSort);
  };
  

  return (
    <div className="">
      <div className="flex flex-col gap-8 overflow-x-hidden">
        <div className="w-full flex justify-between">
          <h1 className="text-[42px] font-semibold">Dashboard</h1>
          <div className="flex gap-3 items-center">
            <DropDown
              sortTitle={ "Pilih merchant"}
              onSortChange={handleSelectedMerchant}
              sortOptions={merchantBox}
            />
            <DatePickerWithRange onDateChange={handleDateChange} />
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Chart
              dataEarnings={earning}
              dataTransations={transactions}
              earning={data.total_earnings}
              transactions={data.total_transactions}
            />
            {/* Render your components or data here */}
            <div className="bg-white p-6 rounded-xl">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-[24px] font-semibold">
                  Merchant Sales & Perfomance
                </h1>
              </div>
              <Table data={dataTabel} />
            </div>

            <ReportDetailOrder />
          </>
        )}
      </div>
    </div>
  );
};

export default Finance;
