"use client";

import { formatEther } from "viem";

import { cn, ellipsableStyles } from "@ark-market/ui";

import usePrices from "~/hooks/usePrices";

interface TokenActionsPriceProps {
  startAmount: string | null;
  isListed: boolean;
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
  isListed,
  topOffer,
}: TokenActionsPriceProps) {
  const { convertInUsd } = usePrices();
  const amountHex = isListed ? startAmount : topOffer.amount;
  const amount = formatEther(BigInt(amountHex ?? 0));
  const amountInUsd = convertInUsd({ amount: BigInt(amountHex ?? 0) });

  let label = "Best offer";

  if (isListed) {
    if (isAuction) {
      label = "Minimum starting price";
    } else {
      label = "Current Price";
    }
  }

  return (
    <div className="mb-6">
      <div className="font-medium text-secondary-foreground">{label}</div>
      <div className="flex items-end gap-3 lg:gap-6">
        <div
          className={cn("text-xl font-semibold lg:text-3xl leading-none", ellipsableStyles)}
        >
          {amount} ETH
        </div>
        <div className="text-lg font-semibold text-muted-foreground lg:text-2xl leading-none">
          ${amountInUsd}
        </div>
        <div className="px-2 py-1 flex items-center whitespace-nowrap rounded-full bg-secondary px-3 text-xs text-secondary-foreground lg:text-sm font-semibold">
          Royalties 5%
        </div>
      </div>
    </div>
  );
}
