
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>page</div>
  )
}

export default page

// import Search from '@/app/components/Search'
// import React, { Suspense } from 'react'
// import BannerModalButton from './BannerModalButton'
// import BannerCard from './BannerCard'


// export default async function page({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string
//   }
// }) {
//   const query = searchParams?.query || ""

//   return (

//     <div className='flex flex-col gap-4'>

//       <div className="flex justify-between items-center">

//         <div className="flex flex-col gap-4">
//           <h1 className="text-4xl font-semibold">Promotional banner</h1>
//           <p>Activate & Deactivate promotional banner for customer</p>
//         </div>

//         <div>
//           <BannerModalButton />
//         </div>
//       </div>
//       <div className='w-full flex justify-between'>

//         <div>

//         </div>
//         <Search placeholder='search' />
//       </div>
//       <BannerCard query={query} />
//     </div>
//   )
// }
