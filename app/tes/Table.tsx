// "use client"

// import { getOrder } from "@/app/lib/actions/orderAction";
// import { OrderData } from "@/app/lib/types";

// import React, { useEffect, useState } from "react";
// type Props = {
//     query: string;
// };

// const Table: React.FC<Props> = ({ query }) => {
//     const [activeOrders, setActiveOrders] = useState<OrderData[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("admin_token");
//                 if (!token) {
//                     throw new Error("Token not found in local storage");
//                 }

//                 const orders = await getOrder();
//                 setActiveOrders(orders);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);


//     //   serach berdasarkan order_pesan_id
//     const filteredData = activeOrders.filter((orders) =>
//         orders.order_pesan_id.toLowerCase().includes(query)
//     );

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="w-full overflow-hidden rounded-lg border border-black shadow-md">
//             <table className="w-full">
//                 <thead>

//                     <tr className="text-base font-semibold text-left text-gray-900 bg-gray-100  border-b border-black">
//                         <th className="border-r border-black px-4 py-4 text-center">
//                             No.
//                         </th>
//                         <th className="border-r border-black px-6 py-4 text-left">
//                             Order ID
//                         </th>
//                         <th className="border-r border-black px-6 py-4 text-left">
//                             Merchant Name
//                         </th>
//                         <th className="border-r border-black px-6 py-4 text-left">
//                             Amount Spent
//                         </th>
//                         <th className="border-r border-black px-6 py-4 text-left">
//                             Payment Method
//                         </th>
//                         <th className="border-r border-black px-6 py-4 text-left">
//                             Status
//                         </th>
//                         <th className="border-r border-black px-6 py-4 text-left">
//                             Detail
//                         </th>
//                     </tr>

//                 </thead>
//                 <tbody>

//                     {filteredData.map((order, index) => (
//                         <tr key={order.id} className="hover:bg-gray-100 ">
//                             <td className="border-t border-r border-black px-4 py-2 font-medium text-center">
//                                 {index + 1}.
//                             </td>
//                             <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
//                                 {order.order_pesan_id}{" "}
//                             </td>
//                             <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
//                                 {order.merchant_name}
//                             </td>
//                             <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
//                                 {order.final_amount}
//                             </td>
//                             <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
//                                 {order.payment_id}{" "}
//                             </td>
//                             <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
//                                 {order.order_status}{" "}
//                             </td>
//                             <td className="py-4 px-6 text-sm font-medium border-t border-r border-black text-gray-900 whitespace-nowrap">
//                                 <button className="text-indigo-600 hover:text-indigo-900">View Detail</button>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>

//     );
// };

// export default Table;
