"use client";

import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import StarknetLogo2 from "@ark-market/ui/icons/starknet-logo-2";
import { Separator } from "@ark-market/ui/separator";

import usePrices from "~/hooks/usePrices";

export default function Prices() {
  const { data, isLoading, error } = usePrices();

  if (isLoading || error) {
    return null;
  }

  return (
    <div className="flex h-full items-center gap-4">
      <div className="flex items-center gap-0.5">
        <EthereumLogo2 className="size-6" />
        <p>ETH Price: ${data.ethereumFormatted}</p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center gap-2">
        <StarknetLogo2 className="size-4" />
        <p>STRK Price: ${data.starknetFormatted}</p>
      </div>
    </div>
  );
}
