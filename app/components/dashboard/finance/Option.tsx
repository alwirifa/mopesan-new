"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onSortChange: (sort: "ASC" | "DESC") => void;
  sortTitle?: string;
};

const Sort = ({ onSortChange, sortTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the options are open
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option

  const handleSortChange = (sort: "ASC" | "DESC") => {
    setSelectedOption(sort);
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex gap-1 border rounded-md  bg-white hadow-sm px-4 py-[10px] items-center"
        onClick={() => setIsOpen(!isOpen)} // Toggle options on click
      >
        <Image src={"/icons/sort.svg"} alt="sort" height={16} width={16} />
        <p className="text-sm">{sortTitle || "Sort"}</p>
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
            className={`block w-full text-left px-4 py-2 text-sm ${
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
