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

const OrderCheckbox = ({ onSelectionChange, options, title }: Props) => {
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
    <div>
      <label className="font-semibold">{title}</label>
      <div className=" p-4 grid grid-cols-2 gap-4 z-10">
        
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
    </div>
  );
};

export default OrderCheckbox;
