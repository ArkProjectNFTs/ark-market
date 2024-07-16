import { useEffect, useState } from "react";

import { cn } from "@ark-market/ui";

import { Input } from "./input";

export interface NumericalInputProps {
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

function NumericalInput({
  onChange,
  value,
  defaultValue,
  placeholder,
  readOnly,
  className,
}: NumericalInputProps) {
  const [amount, setAmount] = useState(defaultValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*\.?[0-9]{0,18}$/;

    if (regex.test(e.target.value) || /^[0-9]+\.$/.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  return (
    <Input
      value={value ?? amount}
      // defaultValue={value}
      onChange={handleChange}
      readOnly={readOnly}
      className={cn(
        "w-full bg-transparent focus-visible:outline-none",
        readOnly && "text-gray-400",
        readOnly && value !== "0" && "text-white/70",
        className,
      )}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder ?? "0"}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  );
}

export { NumericalInput };
