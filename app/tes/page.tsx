"use client"

import { PaginationControls } from '@/app/tes/PaginationControl';
import { useEffect, useState } from 'react';
import { Voucher } from '../lib/types';
import { getVouchers } from '../lib/actions/voucherAction';
import Search from '../components/Search';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '2';

  const [merchants, setMerchants] = useState<Voucher[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // State to hold total items count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const merchantsData = await getVouchers();
        setMerchants(merchantsData);
        setTotalItems(merchantsData.length); // Update total items count
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  return (
    <div className='flex flex-col gap-2 items-center'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {merchants.slice(start, end).map((merchant, index) => (
            <tr key={index}>
              <td>{merchant.voucher_name}</td>
              <td>{merchant.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls
        hasNextPage={end < totalItems}
        hasPrevPage={start > 0}
        totalItems={totalItems} 
      />

      <Search/>
    </div>
  );
}

