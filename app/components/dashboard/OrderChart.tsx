"use client";

import React, { useContext, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "@/app/context/UserContext";

interface Data {
  order_day: string;
  total_earnings: number;
}

interface ServerResponse {
  data: Data[];
}

const OrderChart = () => {
  const [earning, setEarning] = useState<Data[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem("token");

        if (adminToken) {
          let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/weekly-stats`;

          if (user.role_keyword === "admin_merchant") {
            url += `?merchant_id=${user.merchant_id}`;
          }

          const response: AxiosResponse<ServerResponse> = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          });
          const { data } = response.data;
          console.log(data);
          setEarning(data);
        } else {
          console.error("Admin token not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  if (earning.length === 0) {
    return (
      <div>
        Tidak ada data
      </div>
    );
  }

  const chartData = [
    {
      id: "Earnings",
      data: earning.map((item) => ({
        x: item.order_day,
        y: item.total_earnings,
      })),
    },
  ];

  console.log(earning)

  return (
    <div className="bg-white h-[300px] w-full flex rounded-xl">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }} // Atur skala x sebagai skala waktu
        yScale={{
          type: "linear",
          min: 0,
          max: Math.max(...earning.map((item) => item.total_earnings)),
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%b %d", // Atur format tampilan untuk sumbu bawah
          tickValues: "every 1 day", // Tampilkan label untuk setiap hari
        }}
        axisLeft={{
          tickValues: 5, // Adjust the tick values for better readability
        }}
        enablePoints={false}
        enableGridX={false}
        enableGridY={true}
        lineWidth={3}
        enableArea={true}
        colors={{ scheme: "nivo" }}
        enableSlices={"x"}
        sliceTooltip={({ slice }) => (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          >
            <div>
              <strong>Date:</strong> {slice.points[0].data.xFormatted}
            </div>
            {slice.points.map((point) => (
              <div
                key={point.id}
                style={{
                  color: point.serieColor,
                  padding: "3px 0",
                }}
              >
                <strong>{point.serieId}:</strong> {point.data.yFormatted}
              </div>
            ))}
          </div>
        )}
        useMesh={true}
      />
    </div>
  );
};

export default OrderChart;
