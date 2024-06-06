"use client";

import Pagination from "@/app/components/Pagination";
import { formatCurrency, formatDate } from "@/app/lib/formatter";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Table = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<any>({});
  const queryParams = useSearchParams();
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 1;

  useEffect(() => {
    const fetchTabelItem = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/staffs/attendance/${params.id}?page=${currentPage}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dataTabel = response.data.data.staff;
        const page = response.data.data.total_pages;

        setData(dataTabel);
        setTotalPages(page);
        console.log("tabel", response.data);
      } catch (err) {
        console.log(err);
      }
    };

    console.log("curentPage", currentPage);

    
    fetchTabelItem();
  }, [params.id, currentPage, limit]);

  if (data == null || data === undefined || data.length === 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="">Data staff tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="mt-4 ">
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
        <table className="w-full">
          <thead>
            <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100 border-b border-black">
              <th className="border-r border-black px-2 py-4 text-center">
                No.
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Date
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Total Working Hours
              </th>
              <th className="border-r border-black px-6 py-4 text-left">
                Time in
              </th>
              <th className="border-black px-6 py-4 text-left">Time out</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                  {index + 1}.
                </td>
                <td className="py-2 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.updated_at && formatDate(order?.updated_at)}
                </td>
                <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.total_working_hours}
                </td>
                <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                  {order?.time_in && formatDate(order?.time_in)}
                </td>
                <td className="py-4 px-6 font-medium border-t border-black text-gray-900 whitespace-nowrap">
                  {order?.time_out && formatDate(order?.time_out)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Table;
