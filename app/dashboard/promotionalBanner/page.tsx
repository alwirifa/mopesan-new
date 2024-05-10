"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBanners } from '@/app/lib/actions/bannerActions';
import { Banner } from '@/app/lib/types/index'

const Page: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBanners();
      setBanners(data);
    };

    fetchData();
  }, []);

  return (
    <div>

      {/* ini */}
      <div className="flex justify-between items-center">

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Promotional banner</h1>
          <p>Activate & Deactivate promotional banner for customer</p>
        </div>
        <div>
          <Link className=" px-6 py-4 bg-buttonRed text-textRed rounded-lg"
            href='/dashboard/promotionalBanner/add'> + Add Promotional Banner</Link>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-4">
          <div className="bg-white flex gap-3 px-4 py-3 rounded-lg shadow-md">
            <img src="/icons/filter.svg" alt="" />
            <p>Filter</p>
          </div>
          <div className="bg-white flex gap-3 px-4 py-3 rounded-lg shadow-md">
            <img src="/icons/sort.svg" alt="" />
            <p>Sort</p>
          </div>
        </div>

      </div>

      <div className='w-full '>
        <ul className="grid grid-cols-2 gap-8 mt-5 w-full">
          {banners.map(banner => (
            <li className='bg-white rounded-lg p-6 shadow-md' key={banner.id}>
              <div className='border-b pb-4 border-bgRed'>
                <h1 className='text-xl font-semibold capitalize'>{banner.banner_name}</h1>
                <p className='test-xs italic text-textGray'>Date Added {banner.created_at}</p>
              </div>

              <div className='flex justify-center items-center p-4'>
                <img src={banner.banner_image} alt={banner.banner_name} className='h-[300px] w-auto bg-contain' />
              </div>

              <div className='flex justify-end'>
                <Link href={`/dashboard/promotionalBanner/${banner.id}`} className='bg-bgRed px-4 py-2 text-sm font-semibold text-white rounded-md ' >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>


      </div>

    </div>
  );
};

export default Page;