"use client";

import Pagination from "@/app/components/Pagination";
import { formatCurrency, formatDate } from "@/app/lib/formatter";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = ({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 5;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchTabelItem = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/customer/dashboard/${params.id}?page=${currentPage}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data.orders);
        setTotalPages(response.data.data.total_pages);
      
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTabelItem();
  },[searchParams?.page, currentPage]);

  // Filter data yang tidak kosong
  const filteredData = data.filter(
    (order) =>
      order && Object.values(order).some((val) => val !== null && val !== "")
  );

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-[24px]">Item Yang Dipesan</h1>
        <p className="italic text-textGray">History Pesanan</p>
      </div>
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!loading && !error && filteredData.length > 0 && (
        <div className="w-full overflow-hidden rounded-lg border border-black shadow-md mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100 border-b border-black">
                <th className="border-r border-black px-2 py-4 text-center">
                  No.
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  ID Order
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Tanggal Pembelian
                </th>
                <th className="border-r border-black px-6 py-4 text-left">
                  Jumlah Item
                </th>
                <th className="border-black px-6 py-4 text-left">
                  Total Pembelian
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                    {index + 1 + offset}.
                  </td>
                  <td className="py-2 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order?.order_lengkap_id}
                  </td>
                  <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order?.created_at && formatDate(order?.created_at)}
                  </td>
                  <td className="py-4 px-6 font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                    {order?.total_quantity}
                  </td>
                  <td className="py-4 px-6 font-medium border-t border-black text-gray-900 whitespace-nowrap">
                    {order?.sub_total_product &&
                      formatCurrency(order?.sub_total_product)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && filteredData.length === 0 && (
        <p className="text-gray-500 mt-4">Tidak ada data yang tersedia.</p>
      )}
      <div className="w-full flex justify-end mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Table;
