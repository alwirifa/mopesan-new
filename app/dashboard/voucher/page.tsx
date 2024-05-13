"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Search from "@/app/ui/dashboard/search/Search";
import { useVoucherModal } from "@/app/hooks/useVoucherModal";

type Voucher = {
  id: number;
  voucher_name: string;
  description: string;
  code: string;
  minimum_order: number;
  valid_from: string;
  valid_until: string;
  merchant_id: number;
  value: number;
  type_voucher: string;
  max_discount: number;
  total_voucher_number: number;
  voucher_used_count: number;
  created_at: string;
  updated_at: string;
};

const Page: React.FC = () => {
  const router = useRouter();
  const voucherModal = useVoucherModal()
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/vouchers`
        );
        const { data, total } = response.data;
        console.log("Search results:", data);
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const addVoucher = () => {
    router.push("/dashboard/voucher/add");
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("admin_token");
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/vouchers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('data deleted');

      setVouchers(prevVouchers => prevVouchers.filter(voucher => voucher.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/dashboard/voucher/edit/${id}`);
  };


  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Vouchers</h1>
          <p>All available vouchers</p>
        </div>
        <div>
          {/* <button
            onClick={addVoucher}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Voucher
          </button> */}
          <button
            onClick={voucherModal.onOpen}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Voucher
          </button>
        </div>
      </div>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-lg">
        {/* Filter and sort section */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="flex gap-3 px-4 py-3 rounded-lg shadow-md">
              <img src="/icons/filter.svg" alt="" />
              <p>Filter</p>
            </div>
            <div className="flex gap-3 px-4 py-3 rounded-lg shadow-md">
              <img src="/icons/sort.svg" alt="" />
              <p>Sort</p>
            </div>
          </div>

          <Search placeholder="Search ..." />
        </div>

        {/* Voucher list */}
        <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
                  <th className="border-r border-black px-4 py-4 text-center">
                    No.
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Voucher Name
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Deskripsi
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Jenis Potongan
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Besar Potongan
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Minimal Pembelian
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Maksimal Potongan
                  </th>
                  <th className=" border-black px-4 py-4 text-left"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {vouchers.map((voucher, index) => (
                  <tr key={voucher.id} className="hover:bg-gray-100 ">
                    <td className="border-t border-r border-black px-4 py-2 font-semibold text-center">
                      {index + 1}.
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.voucher_name}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.description}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.type_voucher}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.value}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.minimum_order}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {voucher.max_discount}{" "}
                    </td>
                    <td className="border-t  border-black px-4 py-2">
                      <button onClick={() => handleEdit(voucher.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(voucher.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
