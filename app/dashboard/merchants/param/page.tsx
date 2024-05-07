"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Page = () => {

    `${process.env.NEXT_PUBLIC_SERVER_URL} /api/v1/auth/orders/merchant/2/between`


    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
  
    const handleStartDateChange = (event) => {
      setStartDate(event.target.value);
    };
  
    const handleEndDateChange = (event) => {
      setEndDate(event.target.value);
    };
  
    useEffect(() => {
      const params = new URLSearchParams();
      if (startDate && endDate) {
        params.set("start_date", startDate);
        params.set("end_date", endDate);
        router.push(`between?${params.toString()}`);
      }
    }, [startDate, endDate]);
  
    useEffect(() => {
      const startParam = searchParams.get("start_date");
      const endParam = searchParams.get("end_date");
      if (startParam) {
        setStartDate(startParam);
      }
      if (endParam) {
        setEndDate(endParam);
      }
    }, []);
  
    return (
      <div>
        <p>Start Date</p>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        {startDate && <p>Selected Start Date: {startDate}</p>}
  
        <p>End Date</p>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
        {endDate && <p>Selected End Date: {endDate}</p>}
      </div>
    );
  };
  
  export default Page;