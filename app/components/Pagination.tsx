'use client';

import Link from 'next/link';

import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };


  const renderPageNumbers = () => {
    const maxVisiblePages = 3; 

    let startPage = currentPage - Math.floor(maxVisiblePages / 2);
    if (startPage < 1) startPage = 1;

    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbersToRender = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbersToRender.push(i);
    }

    const result = [];
    if (startPage > 1) {
      result.push(
        <Link key="first" href={createPageURL(1)} className="text-primary px-4 py-2">
          1
        </Link>,
        <span key="ellipsisStart" className="text-primary">...</span>
      );
    }

    pageNumbersToRender.forEach(pageNumber => {
      result.push(
        <Link
          key={pageNumber}
          href={createPageURL(pageNumber)}
          className={pageNumber === currentPage ? 'text-white border-2 border-primary px-4 py-2 bg-primary rounded-md' : 'text-primary px-4 py-2'}
        >
          {pageNumber}
        </Link>
      );
    });

    if (endPage < totalPages) {
      result.push(
        <span key="ellipsisEnd" className="text-primary">...</span>,
        <Link key="last" href={createPageURL(totalPages)} className="text-primary px-4 py-2">
          {totalPages}
        </Link>
      );
    }

    return result;
  };

  return (
    <div className="flex gap-6 items-center">
      <Link
        href={createPageURL(currentPage - 1)}
        className={currentPage - 1 === 0 ? `pointer-events-none opacity-50` : "text-primary"}
      >
        Prev
      </Link>

      <div className='flex gap-1 items-center'>
        {renderPageNumbers()}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={currentPage >= totalPages ? `pointer-events-none opacity-50` : "text-primary"}
      >
        Next
      </Link>
    </div>
  );
}
