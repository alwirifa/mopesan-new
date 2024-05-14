'use client';

import Link from 'next/link';

import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="w-full flex gap-6 items-center">


      <Link
        href={createPageURL(currentPage - 1)}
        className={currentPage - 1 === 0 ? `pointer-events-none opacity-50` : "text-textRed"}
      >
        Previous
      </Link>
      <div className='flex gap-1 items-center'>

       {pageNumbers.map((pageNumber) => (
         <Link
         key={pageNumber}
         href={createPageURL(pageNumber)}
         className={
           pageNumber === currentPage ? 'text-textRed border-2 border-bgRed px-4 py-2 bg-buttonRed' : 'text-textRed px-4 py-2'
          }
          >
          {pageNumber}
        </Link>
      ))}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={
          currentPage >= totalPages ? `pointer-events-none opacity-50` : "text-textRed"
        }
      >
        Next
      </Link>

    </div>
  )
}