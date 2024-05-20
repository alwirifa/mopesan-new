"use client"

import Search from '@/app/components/Search'
import React, { Suspense } from 'react'
import BannerModalButton from './BannerModalButton'
import BannerCard from './BannerCard'
import { useBannerModal } from '@/app/hooks/banner/useBannerModal'


export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || ""


  const bannerModal = useBannerModal()

  return (

    <div className='flex flex-col gap-4'>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Promotional banner</h1>
          <p>Activate & Deactivate promotional banner for customer</p>
        </div>
        <div>
          <button
            onClick={bannerModal.onOpen}
            className="max-h-max px-6 py-4 bg-secondary text-primary rounded-lg"
          >
            + Add Menu
          </button>
        </div>
      </div>
      <div className='w-full flex justify-between'>

        <div>

        </div>
        <Search placeholder='search' />
      </div>
      <BannerCard query={query} />
    </div>
  )
}
