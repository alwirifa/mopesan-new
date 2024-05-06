"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Menu {
  order_day: string;
  total_earnings: number; // Menyesuaikan dengan properti yang benar
}

const Page: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem("admin_token");

        if (adminToken) {
          const response = await axios.get<{ data: Menu[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/weekly-stats`,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );
          const { data } = response.data;
          setMenus(data);
          console.log(data)
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
    <div>
      <div className="h-[450px] p-[20px] rounded-md">
        <h2 className="mb-[20px]">Order Activity</h2>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={menus}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="order_day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_earnings" // Menyesuaikan dengan properti yang benar
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;
