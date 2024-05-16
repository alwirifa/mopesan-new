"use client"

"use client"

import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Menu {
  order_day: string;
  total_earnings: number;
}

interface ServerResponse {
  data: Menu[];
}

const Page: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem("admin_token");

        if (adminToken) {
          const response: AxiosResponse<ServerResponse> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/weekly-stats`,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );
          const { data } = response.data;

          const sortedData = data.sort((a, b) => {
            const dateA = new Date(a.order_day);
            const dateB = new Date(b.order_day);
            return dateA.getTime() - dateB.getTime();
          });

          setMenus(sortedData);
          console.log(sortedData);
        } else {
          console.error("Admin token not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredMenus = menus.filter((menu) => {
    const menuDate = new Date(menu.order_day);
    if (startDate && endDate) {
      return menuDate >= startDate && menuDate <= endDate;
    } else if (startDate) {
      return menuDate >= startDate;
    } else if (endDate) {
      return menuDate <= endDate;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-md shadow-custom">
      {/* <div className="flex mb-4">
        <div>
          <label className="mr-2">Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border p-2"
          />
        </div>
        <div>
          <label className="mr-2">End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border p-2"
          />
        </div>
      </div> */}
      <div className="h-[350px] p-[20px] rounded-md">
        <ResponsiveContainer width="100%" height="90%" className="mt-4">
          <AreaChart
            data={filteredMenus}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="order_day" />
            <YAxis dataKey="total_earnings" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total_earnings"
              stroke="#F57E20"
              fill="#FDE1CC"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;
