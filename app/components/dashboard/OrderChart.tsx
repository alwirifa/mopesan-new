"use client";

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
        x: item.order_day, // Use date as x-axis
        y: item.total_earnings,
      })),
    },
  ];

  return (
    <div className="bg-white h-[400px] w-full flex rounded-xl">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }} // Set x-scale as time scale
        yScale={{
          type: "linear",
          min: 0,
          max: Math.max(...earning.map(item => item.total_earnings)),
          stacked: false, // Do not stack the lines
          reverse: false, // Ensure zero is at the bottom
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%b %d", // Set display format for bottom axis
          tickValues: "every 1 day", // Show label for each day
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
