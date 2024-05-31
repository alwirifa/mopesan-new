import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <div className='flex gap-4'>
          <div className='px-4 py-3 border rounded-md text-sm font-semibold'>Semua Cabang</div>
          <div className='px-4 py-3 border rounded-md text-sm font-semibold'>Hari ini</div>
          <div className='px-4 py-3 border border-primary bg-primary rounded-md text-sm font-semibold text-white'>Terapkan</div>
        </div>
      </div>
    </div>
  )
}

export default page