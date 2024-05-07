"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/app/ui/dashboard/search/Search";

type Customer = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  location_lat: number;
  location_long: number;
  google_uid: string;
  profile_image: string;
  stamp_count: number;
  last_stamp_date: string;
  rewards_redeemed_count: number;
  monthly_spend_amount: number;
  created_at: string;
  updated_at: string;
};

const Page: React.FC = ({ searchParams }) => {
  const q = searchParams?.search || "";
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, [q, page]); 

  const fetchData = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers?search=${q}&limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`;
      console.log("Fetching data from:", url);
      const response = await axios.get(url);
      const data = response.data.data;
      console.log("Search results:", data); 
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      console.log("Previous page:", page - 1);
    }
  };
  
  const handleNextPage = () => {
    setPage(page + 1);
    console.log("Next page:", page + 1);
  };
  

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Customer</h1>
        <p>All active Customers</p>
      </div>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-lg">
        {/* Filter and Sort section */}
        <div className="flex justify-between">
          {/* Filter and Sort buttons */}
          <div className="flex gap-4">
            <div className="flex gap-3 px-4 py-3 rounded-lg shadow-md">
              <img src="/icons/filter.svg" alt="" />
              <p>Filter</p>
            </div>
            {/* <div className="flex gap-3 px-4 py-3 rounded-lg shadow-md">
              <img src="/icons/sort.svg" alt="" />
              <p>Sort</p>
            </div> */}
          </div>
          {/* Search component */}
          <Search placeholder="Search ..." />
        </div>

        {/* Customer table */}
        <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
          <div className="w-full overflow-x-auto">
          <table className="w-full">
              <thead>
                <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
                  <th className="border-r border-black px-4 py-4 text-center">
                    No.
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Name
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Email
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Phone Number
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Amount Spend this month
                  </th>
                  <th className="border-r border-black px-6 py-4 text-left">
                    Jumlah Klaim
                  </th>
                  <th className=" border-black px-4 py-4 text-left"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {customers.map((customer, index) => (
                  <tr key={customer.id} className="hover:bg-gray-100 ">
                    <td className="border-t border-r border-black px-4 py-2 font-semibold text-center">
                      {index + 1}.
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {customer.full_name}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {customer.email}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {customer.phone_number}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {customer.monthly_spend_amount}{" "}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                      {customer.rewards_redeemed_count}{" "}
                    </td>
                    <td className="border-t  border-black px-4 py-2"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
