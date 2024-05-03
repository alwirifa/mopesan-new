"use client"

import { useEffect } from 'react';
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 2;
  const offset = (page - 1) * limit;

  useEffect(() => {
    replace(`${pathname}?page=${page}&limit=${limit}&offset=${offset}`);
  }, [page, limit, offset, pathname, replace]);

  const hasPrev = offset > 0;
  const hasNext = offset + limit < count;

  const handleChangePage = (type) => {
    const newPage = type === "prev" ? page - 1 : page + 1;
    replace(`${pathname}?page=${newPage}&limit=${limit}&offset=${(newPage - 1) * limit}`);
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
