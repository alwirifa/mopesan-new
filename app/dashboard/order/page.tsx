"use client"

import Search from '@/app/components/Search';
import { getOrder } from '@/app/lib/actions/orderAction';
import { OrderData } from '@/app/lib/types';
import { Suspense, useEffect, useState } from 'react';
import Table from './Table'
import Pagination from '@/app/components/Pagination';

export default function Home({
    searchParams,
}: {
    searchParams?: {
        query?: string
        page?: string
        limit?: string
    }
}) {

    const query = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) || 8
    const offset = (currentPage - 1) * limit

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalOrders = await getOrder();
                const totalPages = Math.ceil(totalOrders.length / limit);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-6 h-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">Orders</h1>
            <p>List of all Orders</p>
          </div>
         
        </div>
        <section className="flex flex-col gap-6 p-8 bg-white rounded-lg h-full relative">
  
          <div className="flex justify-between">
            {/* <div className="flex gap-4">
              <div className="flex gap-3 px-4 py-3 rounded-lg shadow-md">
                <img src="/icons/filter.svg" alt="" />
                <p>Filter</p>
              </div>
              <div className="flex gap-3 px-4 py-3 rounded-lg shadow-md">
                <img src="/icons/sort.svg" alt="" />
                <p>Sort</p>
              </div>
            </div> */}
            <div></div>
            <Search placeholder='search' />
  
          </div>
            <Suspense key={query + currentPage}>
            <Table query={query} limit={limit} offset={offset} />
        </Suspense>
            <div className='absolute bottom-8 right-8'>
                <Pagination totalPages={totalPages} />
            </div>
            </section>
        </div>
    );
}

