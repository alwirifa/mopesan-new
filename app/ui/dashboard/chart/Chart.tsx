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

interface Menu {
  order_day: string;
  total_earnings: number;
}

interface ServerResponse {
  data: Menu[];
}

const Page: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

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

    return () => {};
  }, []);

  return (
    <div className="bg-white rounded-md">
      <div className="h-[450px] p-[20px] rounded-md">
        <h2 className="mb-[40px] text-2xl font-semibold">Order Activity</h2>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={menus}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="order_day" />
            <YAxis dataKey="total_earnings"/>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total_earnings"
              stroke="#9A031E"
              fill="#E3B8C0"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;
