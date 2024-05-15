"use client"

import { OrderData } from '@/app/lib/types';

type Props = {
    query: string;
    limit: number;
    offset: number;
    orders: OrderData[];
    selectedMonth: string;
    selectedYear: string;
};

const Table: React.FC<Props> = ({ query, limit, offset, orders, selectedMonth, selectedYear }) => {
    const filteredData = orders.filter((order) => {
        const queryMatch = order.order_status.toLowerCase().includes(query.toLowerCase()); // lowercase comparison
        const orderDate = new Date(order.order_date); // Convert order_date to Date object
        const orderYear = orderDate.getFullYear().toString();
        const orderMonth = (orderDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure month is 2 digits
        const monthMatch = !selectedMonth || orderMonth === selectedMonth;
        const yearMatch = !selectedYear || orderYear === selectedYear;

        // console.log(`Order ID: ${order.id}, Year: ${orderYear}`); 



        return queryMatch && monthMatch && yearMatch;
    });

    const paginatedData = filteredData.slice(offset, offset + limit);


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
                        <th className=" border-black px-6 py-4 text-left">
                            Detail
                        </th>
                    </tr>

                </thead>
                <tbody>
                    {paginatedData.map((order, index) => (
                        <tr key={order.id} className="hover:bg-gray-100 ">
                            <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
                                {index + 1}.
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.payment.order_uid}{" "}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
                                {order.merchant_name}
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
                                <button className="text-indigo-600 hover:text-indigo-900">View Detail</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;