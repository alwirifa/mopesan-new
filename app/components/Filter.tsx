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

export default function Filter({ label, options, value, onChange }: FilterProps) {
  const { replace } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
    replace(`?${label}=${selectedValue}`);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
