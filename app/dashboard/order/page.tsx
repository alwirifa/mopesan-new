"use client"

// pages/index.js
import Search from '@/app/components/Search';

import { Suspense, useEffect, useState } from 'react';
import { Table } from './Table'
import Pagination from '@/app/components/Pagination';
import Filter from '@/app/components/Filter';

import EmptyData from '@/app/components/EmptyData';
import { getOrder } from '@/app/api/order';
import { OrderData } from '@/app/types/types';
import Heading from '@/app/components/Heading';
export default function Home({
    searchParams,
}: {
    searchParams?: {
        query?: string
        page?: string
        limit?: string
        selectedMonth?: string
        selectedYear?: string
    }
}) {
    const [selectedMonth, setSelectedMonth] = useState(searchParams?.selectedMonth || "");
    const [selectedYear, setSelectedYear] = useState(searchParams?.selectedYear || "");
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;
    const offset = (currentPage - 1) * limit;
    const [totalPages, setTotalPages] = useState(1);

    const monthOptions = [
        { label: "All Months", value: "" },
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];

    const [yearOptions, setYearOptions] = useState<{ label: string; value: string }[]>([
        { label: "All Years", value: "" }, 
    ]);

    useEffect(() => {
        const fetchYears = async () => {
            try {
                const allOrders = await getOrder();

                const uniqueYears = allOrders.reduce((years: string[], order: OrderData) => {
                    const orderYear = order.order_date.substring(0, 4);
                    if (!years.includes(orderYear)) {
                        years.push(orderYear);
                    }
                    return years;
                }, []);


                const yearOptions = uniqueYears.map((year: string) => ({ label: year, value: year }));

                // Tambahkan opsi "All Years" ke opsi tahun
                yearOptions.unshift({ label: "All Years", value: "" });

                setYearOptions(yearOptions);
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        };

        fetchYears();
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const allOrders = await getOrder();
                let filteredOrders = allOrders;

                if (selectedYear && selectedMonth) {
                    filteredOrders = allOrders.filter(order => {
                        const orderYear = order.order_date.substring(0, 4);
                        const orderMonth = order.order_date.substring(5, 7);
                        return orderYear === selectedYear && orderMonth === selectedMonth;
                    });
                } else if (selectedMonth) {
                    filteredOrders = allOrders.filter(order => order.order_date.substring(5, 7) === selectedMonth);
                } else if (selectedYear) {
                    filteredOrders = allOrders.filter(order => order.order_date.startsWith(selectedYear));
                }

                const totalPages = Math.ceil(filteredOrders.length / limit);
                setTotalPages(totalPages);
                console.log('Selected year:', selectedYear);
                console.log('Selected month:', selectedMonth);
                console.log('total data', filteredOrders.length)
                console.log('Total pages:', totalPages);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedYear, selectedMonth]);



    return (
        <div className="flex flex-col gap-6 h-full">
           <Heading title='Orders' subtitle='List of all orders'/>
            <section className="flex flex-col gap-6 p-8 bg-white rounded-lg h-full relative">
                <div className="flex justify-between">
                    <div>
                        <Filter
                            label="selectedMonth"
                            options={monthOptions}
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                        />
                        <Filter
                            label="selectedYear"
                            options={yearOptions}
                            value={selectedYear}
                            onChange={setSelectedYear}
                        />
                    </div>
                    <Search placeholder='search' />
                </div>
                {totalPages === 0 ? ( 
                    <EmptyData />
                ) : (
                    <Suspense key={query + currentPage}>
                        <Table query={query} limit={limit} offset={offset} selectedMonth={selectedMonth} selectedYear={selectedYear} />
                    </Suspense>
                )}

                <div className='w-full flex justify-end'>
                    <Pagination totalPages={totalPages} />
                </div>
            </section>
        </div>
    );
}
