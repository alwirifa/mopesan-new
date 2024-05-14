"use client"

import { PaginationControls } from '@/app/tes/PaginationControl';
import { useEffect, useState } from 'react';
import { OrderData, Voucher } from '../lib/types';
import { getVouchers } from '../lib/actions/voucherAction';
import Search from '../components/Search';
import { getOrder } from '../lib/actions/orderAction';

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string, [key: string]: string | string[] | undefined };
}) {
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '2';

  const query = searchParams?.query || ""

  const [activeOrders, setActiveOrders] = useState<OrderData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            throw new Error("Token not found in local storage");
        }

        const orders = await getOrder();
        setActiveOrders(orders);
     
        // const merchantsData = await getVouchers();
        // setMerchants(orders);
        setTotalItems(orders.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const filteredOrders = activeOrders.filter(order =>
    order.order_status.toLowerCase().includes(query)
  );
  

  return (
    <div className='flex flex-col gap-2 items-center'>
      <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
            <table className="w-full">
                <thead>

                    <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
                        <th className="border-r border-black px-4 py-4 text-center">
                            No.
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Order ID
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Merchant Name
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Amount Spent
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Payment Method
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Status
                        </th>
                        <th className="border-r border-black px-6 py-4 text-left">
                            Detail
                        </th>
                    </tr>

                </thead>
                <tbody>

                {filteredOrders.slice(start, end).map((order, index)  => (
                        <tr key={order.id} className="hover:bg-gray-100 ">
                            <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                                {index + 1}.
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.order_pesan_id}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.merchant_name}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.final_amount}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.payment_id}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.order_status}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                <button className="text-indigo-600 hover:text-indigo-900">View Detail</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.slice(start, end).map((merchant, index) => (
            <tr key={index}>
              <td>{merchant.order_status}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

    <Search placeholder='search'/>
      <PaginationControls
        hasNextPage={end < totalItems}
        hasPrevPage={start > 0}
        totalItems={totalItems} 
      />

    </div>
  );
}

