// 'use client'

// import { FC } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'

// interface PaginationControlsProps {
//     hasNextPage: boolean
//     hasPrevPage: boolean
//     totalItems: number // Add totalItems prop
//   }
  
//  export const PaginationControls: FC<PaginationControlsProps> = (
//     {
//       hasNextPage,
//       hasPrevPage,
//       totalItems // Receive totalItems prop
//     }
//   ) => {
//     const router = useRouter()
//     const searchParams = useSearchParams()
  
//     const page = searchParams.get('page') ?? '1'
//     const per_page = searchParams.get('per_page') ?? '2'
  
//     return (
//       <div className='flex gap-2'>
//         <button
//           className='bg-blue-500 text-white p-1'
//           disabled={!hasPrevPage}
//           onClick={() => {
//             router.push(`tes/?page=${Number(page) - 1}`)
//           }}>
//           prev page
//         </button>
  
//         <div>
//           {page} / {Math.ceil(totalItems / Number(per_page))} 
//         </div>
  
//         <button
//           className='bg-blue-500 text-white p-1'
//           disabled={!hasNextPage}
//           onClick={() => {
//             router.push(`tes/?page=${Number(page) + 1}`)
//           }}>
//           next page
//         </button>
//       </div>
//     )
//   }
  