"use client"

import { PaginationControls } from '@/app/tes/PaginationControl';
import { useEffect, useState } from 'react';
import { Voucher } from '@/app/lib/types';
import { getVouchers } from '@/app/lib/actions/voucherAction';
import { useVoucherModal } from '@/app/hooks/useVoucherModal';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '2';

  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // State to hold total items count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vouchersData = await getVouchers();
        setVouchers(vouchersData);
        setTotalItems(vouchersData.length); // Update total items count
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const voucherModal = useVoucherModal()

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Vouchers</h1>
          <p>All available vouchers</p>
        </div>
        <div>
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
{/* 
          <Search placeholder="Search ..." /> */}
        </div>

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
              <tbody>
                {vouchers.slice(start, end).map((voucher, index) => (
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

                    </td>
                  </tr>

                ))}
              </tbody>
            </table>


          </div>
        </div>

      </section>
      <PaginationControls
        hasNextPage={end < totalItems}
        hasPrevPage={start > 0}
        totalItems={totalItems}
      />
    </div>
  );
}

