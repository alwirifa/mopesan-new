// Sort.tsx

import React, { useState } from "react";
import Image from "next/image";

type Option = {
  value: string;
  label: string;
};

type Props = {
  onSortChange: (sort: string) => void;
  sortOptions: Option[]; // Menggunakan tipe Option[] untuk sortOptions
  sortTitle?: string;
};

const Sort = ({ onSortChange, sortOptions, sortTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSortChange = (option: string) => {
    setSelectedOption(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex gap-1 border rounded-md bg-white shadow-sm px-[16px] py-[9px] items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={"/icons/sort.svg"} alt="sort" height={16} width={16} />
        <p className="text-sm">{sortTitle || "Sort"}</p>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg w-32">
          {sortOptions.map((option, index) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 ${
                selectedOption === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSortChange(option.value)} // Menggunakan option.value sebagai nilai
            >
              {option.label} {/* Menggunakan option.label sebagai teks */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;
