'use client'

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onSortChange: (sort: "ASC" | "DESC") => void;
};

const Sort = ({ onSortChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the options are open
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option

  const handleSortChange = (sort: "ASC" | "DESC") => {
    setSelectedOption(sort); // Update selected option
    onSortChange(sort); // Notify parent component about the change
    setIsOpen(false); // Close the options
  };

  return (
    <div className="relative">
      <button
        className="flex gap-2 border rounded-lg shadow-sm px-4 py-3 items-center"
        onClick={() => setIsOpen(!isOpen)} // Toggle options on click
      >
        <Image src={"/icons/sort.svg"} alt="sort" height={20} width={20} />
        <p className="text-[16px]">Sort</p>
      </button>
      {/* Options */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg">
          <button
            className={`block w-full text-left px-4 py-2 ${
              selectedOption === "ASC" ? "bg-gray-200" : ""
            }`}
            onClick={() => handleSortChange("ASC")}
          >
            ASC
          </button>
          <button
            className={`block w-full text-left px-4 py-2 ${
              selectedOption === "DESC" ? "bg-gray-200" : ""
            }`}
            onClick={() => handleSortChange("DESC")}
          >
            DESC
          </button>
        </div>
      )}
    </div>
  );
};

export default Sort;
