"use client";

import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import Filter from "@/app/components/Filter";
import CheckBoxOrder from "@/app/components/checboxOrder/CheckboxOrder";
import CheckBoxGroup from "@/app/components/Checkbox";
import MerchantCheckbox from "@/app/components/checboxOrder/MerchantCheckBox";
import OrderCheckbox from "@/app/components/checboxOrder/OrderCheckBox";
import { ChevronDown } from "lucide-react";
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
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const defaultStartDate = new Date(2024, 0, 20);
  const defaultEndDate = new Date(2024, 4, 10);
  const [dataCard, setDataCard] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>({});
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [startDate, setStartDate] = useState<string>(
    formatDateRange(defaultStartDate.toISOString())
  );
  const [endDate, setEndDate] = useState<string>(
    formatDateRange(defaultEndDate.toISOString())
  );

  const queryParams = useSearchParams();
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 10;

  const [selectedMerchants, setSelectedMerchants] = useState<any>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<any>([]);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState<any>([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<any>([]);
  const [merchantBox, setMerchantBox] = useState<any>([]);
  const [orderTypesBox, setOrderTypesBox] = useState<any>([]);
  const [orderStatusBox, setOrderStatusBox] = useState<any>([]);
  const [paymentBox, setPaymentBox] = useState<any>([]);

  useEffect(() => {
    handleSave();
  }, [
    currentPage,
    startDate,
    endDate,
    selectedMerchants,
    selectedPaymentMethods,
    selectedOrderTypes,
    selectedOrderStatus,
    sort,
  ]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/between?sort=${sort}&page=${currentPage}&limit=${limit}`;

      if (startDate) {
        url += `&start_date=${startDate}`;
      }
      if (endDate) {
        url += `&end_date=${endDate}`;
      }
      if (selectedMerchants.length > 0) {
        url += `&merchant_ids=${selectedMerchants}`;
      }
      if (selectedPaymentMethods.length > 0) {
        url += `&payment_methods=${selectedPaymentMethods}`;
      }
      if (selectedOrderTypes.length > 0) {
        url += `&order_type=${selectedOrderTypes}`;
      }
      if (selectedOrderStatus.length > 0) {
        url += `&order_status=${selectedOrderStatus}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      const dataTabel = data.orders;
      setTotalPages(data.total_pages);

      setDataCard(dataTabel);
    } catch (error) {
      console.error("data error:", error);
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/export?start_date=${startDate}&end_date=${endDate}&type=order-sales`,
      "_blank"
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/params?type=order-sales`
        );
        const data = response.data.data;

        setMerchantBox(data.merchants);

        setPaymentBox(data.payment_method);

        setOrderTypesBox(data.order_types);

        setOrderStatusBox(data.order_status);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  const handleMerchantBoxChange = (selectedValues: string[]) => {
    setSelectedMerchants(selectedValues.join(","));
  };
  const handlePaymentBoxChange = (selectedValues: string[]) => {
    setSelectedPaymentMethods(selectedValues.join(","));
  };
  const handleOrderTypesBoxChange = (selectedValues: string[]) => {
    setSelectedOrderTypes(selectedValues.join(","));
  };
  const handleOrderStatusBoxChange = (selectedValues: string[]) => {
    setSelectedOrderStatus(selectedValues.join(","));
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <div className="w-full flex justify-between items-center relative">
        <Heading title="Orders Sales" subtitle="List of all orders" />
        <div
          className="px-4 pr-6 py-2 border rounded-lg text-sm font-semibold bg-primary text-white flex gap-2 absolute top-6 right-0"
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
          <div className="flex gap-4 items-center">
            <div>
              <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
            </div>

            <div className="relative inline-block">
              <button
                className="flex justify-between gap-4 items-center border rounded-md bg-white shadow-sm px-4 py-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <p className="text-black font-base">Filter</p>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </button>

              {isOpen && (
                <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-lg p-4  z-10 min-w-max max-w-content">
                  <div className="flex flex-col gap-2">
                    <OrderCheckbox
                      title="Merchants"
                      options={merchantBox}
                      onSelectionChange={handleMerchantBoxChange}
                    />
                    <OrderCheckbox
                      title="Payment Methods"
                      options={paymentBox}
                      onSelectionChange={handlePaymentBoxChange}
                    />
                    <OrderCheckbox
                      title="Order Types"
                      options={orderTypesBox}
                      onSelectionChange={handleOrderTypesBoxChange}
                    />
                    <OrderCheckbox
                      title="Order Status"
                      options={orderStatusBox}
                      onSelectionChange={handleOrderStatusBoxChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <DatePickerWithRange onDateChange={handleDateChange} />
          </div>
        </div>

        {/* =====================  TABLE  ====================== */}
        <Table data={dataCard} />
        <div className="w-full flex justify-end mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page;
