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
          className={cn(
            "text-xl font-semibold leading-none lg:text-3xl",
            ellipsableStyles,
          )}
        >
          {amount} ETH
        </div>
        <div className="text-lg font-semibold leading-none text-muted-foreground lg:text-2xl">
          ${amountInUsd}
        </div>
        <div className="flex items-center whitespace-nowrap rounded-full bg-secondary px-2 px-3 py-1 text-xs font-semibold text-secondary-foreground lg:text-sm">
          Royalties 5%
        </div>
      </div>
    </div>
  );
}
