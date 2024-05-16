"use client"

import { useEffect, useState } from 'react';
import { getOrderById } from '@/app/lib/actions/orderAction';
import { OrderDataById } from '@/app/lib/types';
import { formatTime, formatDate, formatCurrency } from '@/app/lib/formatters';
import Link from 'next/link';
import Table from './Table';

export default function Home({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    selectedMonth?: string;
    selectedYear?: string;
  };
}) {
  const [orders, setOrders] = useState<OrderDataById | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params && params.id) {
          const data = await getOrderById(params.id);
          if (data !== null && data !== undefined) {
            setOrders(data);
            console.log(data);
          } else {
            console.error("No data received for order ID:", params.id);
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchData();

  }, [params]);


  if (!orders) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col gap-6 h-full">


      <div className='flex flex-col gap-8 bg-white p-8 rounded-xl'>
        <div className='w-full'>
          <Link
            href="/dashboard/order"
            className="max-w-max rounded-full flex items-center gap-1"
          >
            <img src="/icons/chevron-left.svg" alt="" />
            <p className="text-sm font-semibold text-primary">
              Back to order list
            </p>
          </Link>
        </div>

        <div className='flex justify-between items-center'>
          <div>
            <p className='text-4xl font-semibold'>{orders.payment.order_uid}</p>
            <p className='italic text-sm text-textGray'>tanggal pemesanan: {formatDate(orders.order_date)}</p>
          </div>

          <div className='flex flex-col items-end gap-2'>
            <button disabled className='px-4 py-2 rounded-full font-semibold text-primary bg-secondary'>{orders.order_status}</button>
            <p className='italic text-textGray text-xs'>Last Update: {formatDate(orders.order_date)}</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-textGray'>Merchant</p>
          <p className='text-3xl font-semibold'>{orders.merchant_name}</p>
        </div>
        <div className='flex justify-between'>

          <div>
            <p className='text-sm text-textGray'>Customer name</p>
            <p className='text-3xl font-semibold capitalize'>{orders.customer_name}</p>
          </div>
          <div className='flex flex-col items-end'>
            <p className='text-sm text-textGray'>Subtotal</p>
            <p className='text-3xl font-semibold'>{formatCurrency(orders.final_amount)}</p>
          </div>
        </div>
      </div>



      <div className='bg-white p-8 rounded-xl'>

        {/* item yang dipesan */}
        <h1 className='text-2xl font-semibold'>Item yang dipesan</h1>
        <p className='text-sm italic text-textGray'>Total item: 4 item</p>

        <div>
          <Table />
        </div>

        {/* ringkasan pembayaran */}
        <h1 className='py-4 text-2xl font-semibold'>Ringkasan Pembayaran</h1>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-4 text-sm'>
            <p>Harga</p>
            <p>Pajak</p>
            <p>Biaya Admin</p>
            <p>Biaya Penanganan</p>
            <p className='font-semibold'>Subtotal</p>
          </div>
          <div className='flex flex-col gap-4 text-sm'>
            <p>{formatCurrency(orders.sub_total_product)}</p>
            <p>{formatCurrency(orders?.additional_fees?.find(fee => fee.name === 'Pajak')?.amount ?? 0)}</p>
            <p>{formatCurrency(orders?.additional_fees?.find(fee => fee.name === 'Biaya Admin')?.amount ?? 0)}</p>
            <p>{formatCurrency(orders?.additional_fees?.find(fee => fee.name === 'Biaya Penanganan')?.amount ?? 0)}</p>
            <p className='font-semibold'>{formatCurrency(orders.final_amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
