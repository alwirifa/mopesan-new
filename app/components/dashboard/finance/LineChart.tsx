"use client"

import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios, { AxiosResponse } from "axios";

interface Data {
  order_day: string;
  total_earnings: number;
}

interface ServerResponse {
  data: Data[];
}

const LineChart = () => {
  const [earning, setEarning] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem("token");

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
  }, []);

  const chartData = [
    {
      id: "Earnings",
      data: earning.map((item) => ({
        x: item.order_day, // Gunakan tanggal sebagai sumbu x
        y: item.total_earnings,
      })),
    },
  ];

  return (
    <div className="bg-white h-[300px] w-full flex rounded-xl ">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }} // Atur skala x sebagai skala waktu
        yScale={{
          type: "linear",
          min: 0,
          max: Math.max(...earning.map(item => item.total_earnings)),
          stacked: true,
          reverse: true, 
        }}
        
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%b %d", // Atur format tampilan untuk sumbu bawah
          tickValues: "every 1 day", // Tampilkan label untuk setiap hari
        }}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
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

export default LineChart;
