"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@ark-market/ui";

import WalletAccountContent from "./wallet-account-content";

export default function WalletAccountPopover({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  function closePopover() {
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="mt-3 w-80">
        <WalletAccountContent onClose={closePopover} />
      </PopoverContent>
    </Popover>
  );
}
