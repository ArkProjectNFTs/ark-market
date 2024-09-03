"use client";

import { Ethereum, Starknet } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";

import usePrices from "~/hooks/usePrices";

export default function Prices() {
  const { data, isLoading, error } = usePrices();

  if (isLoading || error) {
    return null;
  }

  return (
    <div className="flex h-full items-center gap-4">
      <div className="flex items-center gap-2">
        <Ethereum className="size-4" />
        <p>ETH Price: ${data.ethereumFormatted}</p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center gap-2">
        <Starknet className="size-4" />
        <p>STRK Price: ${data.starknetFormatted}</p>
      </div>
    </div>
  );
}
