"use client";

import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface Props {
  data: any[];
}
const EarningChart = ({ data }: Props) => {

  if (!data) {
    return (
      <div>
        Tidak ada data 
      </div>
    )
  }
  
  const chartData = [
    {
      id: "Earnings",
      data: data.map((item) => ({
        x: item.date_name, 
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
          max: Math.max(...data.map((item) => item.total_earnings)),
          stacked: false, // Ensure this is false to avoid unnecessary stacking
          reverse: false, // Ensure this is false to avoid inverted y-axis
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

export default EarningChart;
