import { useRouter } from "next/navigation";

interface Option {
  label: string;
  value: string;
}

interface FilterProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function MenuFilter({ label, options, value, onChange }: FilterProps) {
  const { replace } = useRouter();

  const handleClick = (selectedValue: string) => {
    onChange(selectedValue);
    replace(`?${label}=${selectedValue}`);
  };

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <div
          key={option.value}
          className={`px-4 py-2 border  cursor-pointer rounded-md ${value === option.value ? "bg-primary border border-primary text-white font-medium" : "text-primary font-medium border-primary "}`}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
}
