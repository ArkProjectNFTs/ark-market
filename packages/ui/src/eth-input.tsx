import * as React from "react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { NumericalInputProps } from "./numerical-input";
import EthereumLogo2 from "./icons/ethereum-logo-2";
import { NumericalInput } from "./numerical-input";

export default function EthInput({
  className,
  ...props
}: PropsWithClassName<NumericalInputProps>) {
  return (
    <div className={cn("relative w-full", className)}>
      <NumericalInput className="pr-20" {...props} />
      <div className="pointer-events-none absolute right-2 top-1/2 flex h-[1.875rem] -translate-y-1/2 transform items-center justify-center gap-1 rounded-xs bg-secondary px-2 text-secondary-foreground">
        <EthereumLogo2 className="size-4" />
        <span className="font-medium">ETH</span>
      </div>
    </div>
  );
}

export { EthInput };
