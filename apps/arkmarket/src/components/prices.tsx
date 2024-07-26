"use client";

import { useQuery } from "react-query";

import { formatNumber } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import StarknetLogo2 from "@ark-market/ui/icons/starknet-logo-2";
import { Separator } from "@ark-market/ui/separator";

import getPrices from "~/lib/getPrices";

export default function Prices() {
  const { isLoading, error, data } = useQuery("prices", getPrices, {
    refetchInterval: 15_000,
  });

  if (isLoading || error || !data) {
    return null;
  }

  return (
    <div className="flex h-full items-center gap-4">
      <div className="flex items-center gap-0.5">
        <EthereumLogo2 className="size-6" />
        <p>ETH Price: ${formatNumber(data.ethereum.price)}</p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center gap-2">
        <StarknetLogo2 className="size-4" />
        <p>STRK Price: ${formatNumber(data.starknet.price)}</p>
      </div>
    </div>
  );
}
