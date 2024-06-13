"use client"

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  onSortChange: (sort: string) => void;
  sortOptions: Option[]; // Menggunakan tipe Option[] untuk sortOptions
  sortTitle?: string;
};

const DropDown = ({ onSortChange, sortOptions, sortTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null); // Menggunakan tipe Option | null

  const handleSortChange = (option: string) => {
    const selected = sortOptions.find((opt) => opt.value === option) || null;
    setSelectedOption(selected);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        className="flex gap-6 border rounded-md bg-white shadow-sm px-[16px] py-[7px] items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-black font-base">{selectedOption ? selectedOption.label :  sortTitle}</p>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg max-w-max p-2 space-y-2">
          {/* Menambahkan opsi "All" */}
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-sm ${
              !selectedOption ? "bg-gray-200" : ""
            }`}
            onClick={() => handleSortChange("")}
          >
            All
          </button>
          {/* Menampilkan opsi-opsi kategori */}
          {sortOptions.map((option, index) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-sm ${
                selectedOption && selectedOption.value === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
