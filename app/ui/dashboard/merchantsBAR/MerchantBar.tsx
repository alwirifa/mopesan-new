import React from 'react'

type Props = {}

const MerchantBar = (props: Props) => {
  return (
    <div className="bg-white rounded-md p-6 w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Merchants</h1>
        <p className="italic text-xs underline text-maroon">View All</p>
      </div>

      {/* card */}
      <div className="mt-6 flex flex-col gap-4">
        <div className=" border border-grayBorder rounded-md p-4 w-full flex flex-start justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <img
              src="/icons/kokurukIcon.png"
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <p className="capitalize text-lg font-semibold">Kokuruk Kemang</p>
          </div>
          <div className="text-textGreen bg-buttonGreen px-4 py-2 rounded-full text-sm">
            Open
          </div>
        </div>

        <div className=" border border-grayBorder rounded-md p-4 w-full flex flex-start justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <img
              src="/icons/kokurukIcon.png"
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <p className="capitalize text-lg font-semibold">Kokuruk Kemang</p>
          </div>
          <div className="text-textGreen bg-buttonGreen px-4 py-2 rounded-full text-sm">
            Open
          </div>
        </div>

        <div className=" border border-grayBorder rounded-md p-4 w-full flex flex-start justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <img
              src="/icons/kokurukIcon.png"
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <p className="capitalize text-lg font-semibold">Kokuruk Kemang</p>
          </div>
          <div className="text-textGreen bg-buttonGreen px-4 py-2 rounded-full text-sm">
            Open
          </div>
        </div>


      </div>
    </div>
  )
}

export default MerchantBar