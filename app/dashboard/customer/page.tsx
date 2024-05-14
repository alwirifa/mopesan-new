import Pagination from '@/app/components/Pagination'
import Search from '@/app/components/Search'
import { GetCustomer } from '@/app/lib/actions/_actions'
import React, { Suspense } from 'react'
import Table from './Table'


export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    limit?: string
  }
}) {
  const search = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || 8
  const offset = (currentPage - 1) * limit

  const { data, totalPages } = await GetCustomer({ offset, limit, search })

  return (
    <div className="flex flex-col gap-6 h-full ">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Customer</h1>
        <p>All active Customers</p>
      </div>


      <section className="flex flex-col gap-6 p-8 bg-white rounded-lg h-full relative">

        <div className="flex justify-between">

          <div></div>
          <Search placeholder='search' />

        </div>
        <Suspense key={search + currentPage}>
          <Table data={data} />
        </Suspense>
        <div className='absolute bottom-8 right-8'>

          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </div>
  )
}
