"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Banner = {
  created_at: string;
  updated_at: string;
  banner_name: string;
  banner_image: string;
  description: string;
  id: number;
  is_active: boolean;
};

const Page: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner`);
        setBanners(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
