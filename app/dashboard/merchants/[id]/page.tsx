"use client"

import Search from '@/app/components/Search';
import { getOrder } from '@/app/lib/actions/orderAction';
import { Merchant, OrderData } from '@/app/lib/types';
import { Suspense, useEffect, useState } from 'react';
import Table from './Table'
import Pagination from '@/app/components/Pagination';
import { getMerchantById, getMerchants } from '@/app/lib/actions/merchantsActions';
import Link from 'next/link';
import Filter from '@/app/components/Filter';
import EmptyData from '@/app/components/EmptyData';
import { formatCurrency, formatTime } from '@/app/lib/formatters';

export default function Home({
  searchParams, params
}: {
  params: { id: string }
  searchParams?: {
    query?: string
    page?: string
    limit?: string

    selectedMonth?: string
    selectedYear?: string
  }
}) {

  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || 10
  const offset = (currentPage - 1) * limit
  const [totalPages, setTotalPages] = useState(1);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(searchParams?.selectedMonth || "");
  const [selectedYear, setSelectedYear] = useState(searchParams?.selectedYear || "");
  const [merchant, setMerchant] = useState<any>(null);


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

  const [hoursData, setHoursData] = useState<Merchant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const merchantsData = await getMerchants();
        setHoursData(merchantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const allOrders = await getOrder();

        // Ekstrak tahun dari data order dan hilangkan duplikasi
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
    if (params && params.id) {
      getMerchantById(params.id)
        .then((data) => {
          setMerchant(data);
          // console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    }
  }, [params]);


  const [data, setData] = useState<OrderData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalOrders = await getOrder();

        let filteredOrders = totalOrders.filter(order =>
          order.merchant_id.toString() === params.id
        );

        if (selectedYear && selectedMonth) {
          filteredOrders = filteredOrders.filter(order => {
            const orderYear = order.order_date.substring(0, 4);
            const orderMonth = order.order_date.substring(5, 7);
            return orderYear === selectedYear && orderMonth === selectedMonth;
          });
        } else if (selectedMonth) {
          filteredOrders = filteredOrders.filter(order => order.order_date.substring(5, 7) === selectedMonth);
        } else if (selectedYear) {
          filteredOrders = filteredOrders.filter(order => order.order_date.startsWith(selectedYear));
        }

        const totalPages = Math.ceil(filteredOrders.length / limit);
        setTotalPages(totalPages);
        setOrders(filteredOrders);


        const filteredData = filteredOrders.filter((order) => {
          const queryMatch = order.order_status.toLowerCase().includes(query.toLowerCase());
          const orderDate = new Date(order.order_date);
          const orderYear = orderDate.getFullYear().toString();
          const orderMonth = (orderDate.getMonth() + 1).toString().padStart(2, '0');
          const monthMatch = !selectedMonth || orderMonth === selectedMonth;
          const yearMatch = !selectedYear || orderYear === selectedYear;

          return queryMatch && monthMatch && yearMatch;
        });

        const paginatedData = filteredData.slice(offset, offset + limit);

        setData(paginatedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id, selectedYear, selectedMonth, limit]);



  if (!merchant) {
    return (
      <>Loading...</>
    )
  }


  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="p-6 rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <div className='w-full flex justify-between'>
            <Link
              href="/dashboard/merchants"
              className="flex items-center gap-1"
            >
              <img src="/icons/chevron-left.svg" alt="" />
              <p className="text-sm font-semibold text-primary">
                Back to merchant list
              </p>
            </Link>
            <div className='flex flex-col gap-2 items-end'>
              <div>
                <button
                  className={`max-h-max px-4 py-2 rounded-full text-sm ${merchant.is_open ? "bg-buttonGreen text-textGreen" : "bg-secondary text-primary"
                    }`}
                >
                  {merchant.is_open ? "Open" : "Closed"}
                </button>
              </div>
              <div>
                {hoursData
                  .filter(merchant => merchant.operating_hours.merchant_id === Number(params.id))
                  .map((merchant, index) => (
                    <p key={index} className="text-sm text-textGray italic">
                      Opening Hours: {" "}
                      {formatTime(
                        merchant.operating_hours.opening_hours
                      )}
                      {" "}
                      -
                      {" "}
                      {formatTime(
                        merchant.operating_hours.closing_hours
                      )}
                    </p>
                  ))
                }
              </div>
            </div>


          </div>
          {/* <div>
            <Link href={`/dashboard/merchants/edit/${params.id}`}>EDIT</Link>
          </div> */}
          <h1 className="text-4xl font-semibold">{merchant.merchant_name}</h1>
          <p className="italic text-textGray">{merchant.address}</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3 mt-4">
              <div className='flex gap-2'>
                <img src="/icons/merchant/user-circle.svg" alt="" />
                <p className="font-semibold">{merchant.pic_name}</p>
              </div>
              <div className='flex gap-2'>
                <img src="/icons/merchant/phone-call.svg" alt="" />
                <p className="font-semibold">{merchant.phone_number}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Active Order (Daily)</p>
                <p className="text-xl font-semibold">
                  {merchant.daily_order_active}
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">
                  Order Cancelled (Daily)
                </p>
                <p className="text-xl text-primary font-semibold">
                  {merchant.daily_order_cancelled}
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">
                  Order Delivered (Daily)
                </p>
                <p className="text-xl font-semibold">
                  {merchant.daily_order_delivered}
                </p>
              </div>
              <div className="p-4 border rounded-md flex flex-col gap-2">
                <p className="text-sm text-textGray">Daily Earnings</p>
                <div className="flex gap-1">
                  <p className="text-xs -translate-y-[2px] text-textGray">
                    Rp
                  </p>
                  <p className="text-xl font-semibold">

                    {formatCurrency(merchant.daily_earning)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-6 p-8 bg-white rounded-lg h-full relative">
        <div className="flex flex-col gap-4  rounded-md bg-white">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Order History</h1>
              {/* <p className="italic text-sm text-textGray">
                showing data from:{" "}
              </p> */}
            </div>
            <div>
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
            </div>
          </div>
          {/* <div className="flex gap-4">
            <div className="p-2 rounded-md border w-full flex-1 flex flex-col gap-2">
              <p className="text-sm text-textGray">Monthly Earnings</p>
              <p className="text-xl font-semibold">
             jumlah final_amount
              </p>
            </div>
            <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
              <p className="text-sm text-textGray">Total Orders</p>
              <p className="text-xl font-semibold">
             jumlah order
              </p>
            </div>
            <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
              <p className="text-sm text-textGray">Tax Total (Estimation)</p>
              <p className="text-xl font-semibold">
                jumlah aditional fees pajak 
              </p>
            </div>
            <div className="p-4 rounded-md border flex-1 flex flex-col gap-2">
              <p className="text-sm text-textGray">Average Income (Estimation)</p>
              <p className="text-xl font-semibold">
               income
              </p>
            </div>
          </div> */}
        </div>


        {/* Table */}

        {/* <div className="flex justify-between">
            <div></div>
            <Search placeholder='search' />
          </div> */}

        {totalPages === 0 ? (
          <EmptyData />
        ) : (
          <Suspense key={query + currentPage}>
            <Table data={data} />
          </Suspense>
        )}
        <div className='w-full flex justify-end'>

          <Pagination totalPages={totalPages} />
        </div>


      </section>
    </div>
  );
}

