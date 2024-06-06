import React, { useState } from "react";
import Chart from "./Chart";
import ReportDetailOrder from "./ReportDetailOrder";
import Sort from "./Option";
import { DateRange } from "react-day-picker";
import { formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "../../DatePickerWithRange";
import Table from "./Table";

type Props = {};

const Finance = (props: Props) => {
  const [sort, setSort] = useState("ASC");
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
    <div className="flex flex-col gap-8 overflow-x-hidden">
      <div className="w-full flex justify-between">
        <h1 className="text-[42px] font-semibold">Dashboard</h1>

        <div className="flex gap-3 items-center">
          <Sort onSortChange={handleSortChange} sortTitle="Select Merchant" />{" "}
          <DatePickerWithRange onDateChange={handleDateChange} />
          <button
            onClick={() => {}}
            className="px-4 py-[10px] text-sm rounded-md text-white bg-primary "
          >
            Terapkan
          </button>
        </div>
      </div>

      <Chart />

      {/* =================  Sales & Perfomance  =============== */}
      <div className="bg-white p-6 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[24px] font-semibold">
            Merchant Sales & Perfomance
          </h1>
          <Sort onSortChange={handleSortChange} sortTitle="Highest to Lowest" />{" "}
        </div>
        <Table />
      </div>

      <ReportDetailOrder />
    </div>
  );
};

export default Finance;
