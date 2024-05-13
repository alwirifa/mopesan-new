"use client";

import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);


    if (e.target.value) {
      // e.target.value.length > 2 &&
       params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="w-full max-w-md px-4 py-2 rounded-md shadow-md flex items-center gap-2 bg-white">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="italic text-textGray outline-none"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;