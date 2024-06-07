import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  onSelectionChange: (selectedValues: string[]) => void;
  options: Option[];
  title?: string;
};

const CheckBoxGroup = ({ onSelectionChange, options, title }: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectionChange = (value: string) => {
    let newSelectedValues: string[] = [];

    if (value === "") {
      // Jika memilih "All", set semua nilai yang dipilih ke kosong
      newSelectedValues = [];
    } else {
      const currentIndex = selectedValues.indexOf(value);
      if (currentIndex === -1) {
        newSelectedValues = [...selectedValues, value];
      } else {
        newSelectedValues = selectedValues.filter((val) => val !== value);
      }
    }

    setSelectedValues(newSelectedValues);
    onSelectionChange(newSelectedValues);
  };

  return (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg p-4 grid grid-cols-2 gap-4 z-10 min-w-max">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          value=""
          checked={selectedValues.length === 0}
          onChange={() => handleSelectionChange("")}
          className="form-checkbox h-5 w-5"
        />
        <span>All</span>
      </label>
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => handleSelectionChange(option.value)}
            className="form-checkbox h-5 w-5"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBoxGroup;
