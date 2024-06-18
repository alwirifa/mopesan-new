import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import Table from "./Table";
import axios from "axios";
import DropDown from "../../Dropdown";
import { DateRange } from "react-day-picker";
import { formatDateRange } from "@/app/lib/formatter";
import { DatePickerWithRange } from "../../DatePickerWithRange";
import ReportDetailOrder from "./ReportDetailOrder";

type Props = {};

const Finance = (props: Props) => {
  const defaultStartDate = new Date(2024, 0, 20);
  const defaultEndDate = new Date(2024, 4, 10);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>({
    from: defaultStartDate,
    to: defaultEndDate,
  });
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
  const [selectedMerchant, setSelectedMerchant] = useState<any>(2);

  const handleSelectedMerchant = (newSort: string) => {
    setSelectedMerchant(newSort);
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
      setLoading(true);
      try {
        const adminToken = localStorage.getItem("token");


        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/params?type=order-sales`
        );
        const data = response.data.data;

        setMerchantData(data.merchants);

        if (adminToken) {
          let url =   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/finance-dashboard`
          if (selectedMerchant) {
            url += `?merchant_id=${selectedMerchant}`;
          }
          if (startDate) {
            url += `&start_date=${startDate}`;
          }
          if (endDate) {
            url += `&end_date=${endDate}`;
          }
          
          const response = await axios.get(url, 
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );

          const data = response.data.data;
          const earningChart = response.data.data.list_earnings;
          const transactionsChart = response.data.data.list_transaction;

          setEarning(earningChart);
          setTransactions(transactionsChart);
          setData(data);
          setDataTabel(data.merchant_sales);
        } else {
          console.error("Admin token not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedMerchant, startDate, endDate]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
       <DatePickerWithRange onDateChange={handleDateChange} />
      {/* <div className="flex flex-col gap-8 overflow-x-hidden">
        <div className="w-full flex justify-between">
          <h1 className="text-[42px] font-semibold">Dashboard</h1>
          <div className="flex gap-3 items-center">
            <DropDown
              sortTitle="Pilih merchant"
              onSortChange={handleSelectedMerchant}
              sortOptions={merchantData}
              
            />
            <DatePickerWithRange onDateChange={handleDateChange} />
          </div>
        </div>

        <Chart
          dataEarnings={earning}
          dataTransations={transactions}
          earning={data.total_earnings}
          transactions={data.total_transactions}
        />
        <div className="bg-white p-6 rounded-xl">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-[24px] font-semibold">
              Merchant Sales & Perfomance
            </h1>
          </div>
          <Table data={dataTabel} />
        </div>

        <ReportDetailOrder />
      </div> */}
    </div>
  );
};

export default Finance;
