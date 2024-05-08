"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBanners } from '@/app/lib/actions/BannerActions';
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
      <h1>Banners</h1>
      <ul>
        {banners.map(banner => (
          <li key={banner.id}>
            <img src={banner.banner_image} alt={banner.banner_name} className='h-[400px] w-[400px]' />
            <p>{banner.description}</p>
            <Link href={`/dashboard/promotionalBanner/${banner.id}`}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;