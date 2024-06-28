"use client";

import { useQuery } from "react-query";
import { formatEther } from "viem";

import { cn, ellipsableStyles } from "@ark-market/ui";

import getPrices from "~/lib/getPrices";

interface TokenActionsPriceProps {
  startAmount: string;
  isAuction: boolean;
  hasOffer: boolean;
  topOffer: {
    amount: string;
    order_hash: string;
  };
}

export default function TokenActionsPrice({
  startAmount,
  isAuction,
  hasOffer,
  topOffer,
}: TokenActionsPriceProps) {
  const { data } = useQuery("prices", getPrices, {
    refetchInterval: 15_000,
  });

  const price = hasOffer
    ? formatEther(BigInt(topOffer.amount))
    : formatEther(BigInt(startAmount || 0));
  const priceInUSD = data ? data.ethereum.price * parseFloat(price) : 0;

  return (
    <div className="mb-6">
      <div className="font-medium text-secondary-foreground">
        {hasOffer
          ? "Best offer"
          : isAuction
            ? "Minimum starting price"
            : "Current Price"}
      </div>
      <div className="flex items-end gap-3 lg:gap-6">
        <div
          className={cn("text-xl font-semibold lg:text-3xl", ellipsableStyles)}
        >
          {price} ETH
        </div>
        <div className="text-lg font-semibold text-muted-foreground lg:text-2xl">
          ${priceInUSD ? priceInUSD.toFixed(2) : "--"}
        </div>
        <div className="flex h-8 items-center whitespace-nowrap rounded-full bg-secondary px-3 text-xs text-secondary-foreground lg:text-sm">
          Royalties 5%
        </div>
      </div>
    </div>
  );
}
