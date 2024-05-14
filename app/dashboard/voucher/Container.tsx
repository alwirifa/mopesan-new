import Pagination from '@/app/components/Pagination'
import Search from '@/app/components/Search'
import { GetVoucher } from '@/app/lib/actions/_actions'
import React, { Suspense } from 'react'
import Table from './Table'

export default async function Container({
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
  const limit = Number(searchParams?.limit) || 3
  const offset = (currentPage - 1) * limit

  const { data, totalPages } = await GetVoucher({ offset, limit, search })

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Vouchers</h1>
          <p>All available vouchers</p>
        </div>
        <div>
          <button
            // onClick={voucherModal.onOpen}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Voucher
          </button>
        </div>
      </div>
      <section className="flex flex-col gap-6 p-8 bg-white rounded-lg">

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
          <Search placeholder='search' />

        </div>
        <Suspense key={search + currentPage}>
          <Table data={data} />
        </Suspense>
        <Pagination totalPages={totalPages} />
      </section>
    </div>
  )
}
