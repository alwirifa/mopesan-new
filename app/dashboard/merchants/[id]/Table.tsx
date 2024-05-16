"use client"

import { OrderData } from '@/app/lib/types';
import Link from 'next/link';

type Props = {
    data: OrderData[];
};

const Table: React.FC<Props> = ({ data }) => {


    return (
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
                            Order Type
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
                        <th className=" border-black px-6 py-4 text-left">
                            Detail
                        </th>
                    </tr>

                </thead>
                <tbody>
                    {data.map((order, index) => (
                        <tr key={order.id} className="hover:bg-gray-100 ">
                            <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                                {index + 1}.
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.payment.order_uid}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.order_type}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                Rp.  {order.final_amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).slice(3)}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.payment.payment_method}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.order_status}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t  border-black text-gray-900 whitespace-nowrap">
                                <Link href={`/dashboard/merchants/order/${order.payment.id}`} className="text-indigo-600 hover:text-indigo-900">
                                    View Detail
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;