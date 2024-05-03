"use client"

import { useEffect } from 'react';
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count, onPageChange }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  let page = parseInt(searchParams.get("page")) || 1;
  let limit = parseInt(searchParams.get("limit")) || 2;
  let offset = parseInt(searchParams.get("offset")) || 0;

  if (isNaN(page) || page <= 0) {
    page = 1;
  }
  if (isNaN(limit) || limit <= 0) {
    limit = 2;
  }
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }

  console.log("Page:", page);
  console.log("Limit:", limit);
  console.log("Offset:", offset);

  useEffect(() => {
    replace(`${pathname}?page=${page}&limit=${limit}&offset=${offset}`);
  }, [page, limit, offset, pathname, replace]);

  const hasPrev = offset > 0;
  const hasNext = offset + limit < count;

  const handleChangePage = (type) => {
    const newPage = type === "prev" ? page - 1 : page + 1;
    onPageChange(newPage);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
