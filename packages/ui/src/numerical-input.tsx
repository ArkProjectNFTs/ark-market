import { cn } from "@ark-market/ui";

import type { InputProps } from "./input";
import { Input } from "./input";

export type NumericalInputProps = InputProps & {
  onValueChange?: (value: string) => void;
};

function NumericalInput(inputProps: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]*\.?[0-9]{0,18}$/;

    if (regex.test(e.target.value) || /^[0-9]+\.$/.test(e.target.value)) {
      if (inputProps.onChange) {
        inputProps.onChange(e);
      }
    }
  };

  return (
    <Input
      {...inputProps}
      onChange={handleChange}
      className={cn(
        "w-full bg-transparent focus-visible:outline-none",
        inputProps.readOnly && "text-gray-400",
        inputProps.readOnly && inputProps.value !== "0" && "text-white/70",
        inputProps.className,
      )}
      status={inputProps.status}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  );
}

export { NumericalInput };
