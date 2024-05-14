"use client"

import { Banner } from '@/app/lib/types';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
    query: string;
};

const BannerCard: React.FC<Props> = ({ query }) => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner`);
                setBanners(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const filteredData = banners.filter((movie) =>
        movie.banner_name.toLowerCase().includes(query)
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='w-full '>
            <ul className="grid grid-cols-2 gap-8 mt-4 w-full">
                {filteredData.map(banner => (
                    <li className='bg-white rounded-lg p-6 shadow-md' key={banner.id}>
                        <div className='border-b pb-4 border-bgRed'>
                            <h1 className='text-xl font-semibold capitalize'>{banner.banner_name}</h1>
                            <p className='test-xs italic text-textGray'>Date Added {banner.created_at}</p>
                        </div>
                        <div className='flex justify-center items-center p-4'>
                            <img src={banner.banner_image} alt={banner.banner_name} className='h-[300px] w-auto bg-contain' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={`/dashboard/promotionalBanner/${banner.id}`}>
                                <p className='bg-bgRed px-4 py-2 text-sm font-semibold text-white rounded-md'>
                                    Details
                                </p>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default BannerCard;