"use client";

import { formatCurrency } from "@/app/lib/formatter";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [paymentData, setPaymentData] = useState<any>({});
  const [paymentType, setPaymentType] = useState<any>([]);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in local storage");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/payment-method-sales`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const firstData = response.data.data.first_data;
        const secondData = response.data.data.second_data;

        setPaymentData(firstData);
        setPaymentType(secondData);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayment();
  }, []);

  return (
    <div>
      <h1 className="text-[42px] font-semibold">Sales by Payment Method</h1>
      <div className="flex gap-8 mt-8">
       
        <div className="p-4 rounded-md border bg-white flex-1 flex flex-col gap-2">
          <p className="text-sm text-textGray">Total Payment Method Type</p>
          <p className="text-xl font-semibold text-green-900">
          {paymentData?.total_payment_method_types} Total
          </p>
        </div>
        <div className="p-4 rounded-md border bg-white flex-1 flex flex-col gap-2">
          <p className="text-sm text-textGray">Total Transaction</p>
          <p className="text-xl font-semibold text-green-900">
            {paymentData?.total_transactions} Transaction
          </p>
        </div>

        <div className="p-4 rounded-lg border bg-white flex-1 flex flex-col gap-2">
          <p className="text-sm text-textGray">Total Sales</p>
          <p className="text-xl font-semibold text-green-900">
            {paymentData?.total_sales &&
              formatCurrency(paymentData?.total_sales)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {paymentType.map((data: any, index: React.Key | null | undefined) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-[32px] pb-2 capitalize">{data?.payment_method}</h1>
            <div className="flex justify-between">
              <p className="font-semibold">Total Transaction</p>
              <p>{data?.total_transactions}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Total Sales</p>
              <p>{data?.total_sales && formatCurrency(data?.total_sales)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Highest Transaction</p>
              <p>
                {data?.highest_transaction &&
                  formatCurrency(data?.highest_transaction)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Lowest Transaction</p>
              <p>
                {data?.lowest_transaction &&
                  formatCurrency(data?.lowest_transaction)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
