import * as React from "react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { NumericalInputProps } from "./numerical-input";
import EthereumLogo2 from "./icons/ethereum-logo-2";
import { NumericalInput } from "./numerical-input";

export default function EthInput({
  className,
  value,
  status,
  ...props
}: PropsWithClassName<NumericalInputProps>) {
  return (
    <div className={cn("relative w-full", className)}>
      <NumericalInput
        className="pr-20"
        value={value}
        status={status}
        {...props}
      />
      <div className="pointer-events-none absolute right-2 top-1/2 flex h-[1.875rem] -translate-y-1/2 transform items-center justify-center gap-1 rounded-xs bg-secondary px-2">
        <EthereumLogo2 className="size-4" />
        <span
          className={cn(
            "font-medium",
            value && status !== "error"
              ? "text-foreground"
              : "text-secondary-foreground",
          )}
        >
          ETH
        </span>
      </div>
    </div>
  );
}

export { EthInput };
