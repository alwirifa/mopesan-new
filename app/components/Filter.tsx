// filter.tsx

import React, { useState } from "react";
import Image from "next/image";

type Option = {
  value: string;
  label: string;
};

type Props = {
  onFilterChange: (filter: string) => void;
  filterOptions: Option[]; // Menggunakan tipe Option[] untuk filterOptions
  filterTitle?: string;
};

const Filter = ({ onFilterChange, filterOptions, filterTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handlefilterChange = (option: string) => {
    setSelectedOption(option);
    onFilterChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex gap-1 border rounded-md bg-white shadow-sm px-[16px] py-[9px] items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={"/icons/filter.svg"} alt="filter" height={16} width={16} />
        <p className="text-sm">{filterTitle || "Filter"}</p>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg w-32">
          {filterOptions.map((option, index) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 ${
                selectedOption === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => handlefilterChange(option.value)} // Menggunakan option.value sebagai nilai
            >
              {option.label} {/* Menggunakan option.label sebagai teks */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
