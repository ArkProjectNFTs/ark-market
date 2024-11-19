"use client";

import { formatUnits } from "viem";

import { cn, ellipsableStyles } from "@ark-market/ui";

import type { TokenMarketData } from "~/types";
import useUsdPrice from "~/hooks/useUsdPrice";

interface TokenActionsPriceProps {
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsPrice({
  tokenMarketData,
}: TokenActionsPriceProps) {
  const label = tokenMarketData.is_listed
    ? tokenMarketData.listing.is_auction
      ? "Minimum starting price"
      : "Current Price"
    : "Best offer";
  const amount = tokenMarketData.is_listed
    ? BigInt(tokenMarketData.listing.start_amount)
    : BigInt(tokenMarketData.top_offer.amount);
  const currency = tokenMarketData.is_listed
    ? tokenMarketData.listing.currency
    : tokenMarketData.top_offer.currency;
  const usdPrice = useUsdPrice({ amount, currency });
  const amountFormatted = formatUnits(amount, currency.decimals);

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
          {amountFormatted} {currency.symbol}
        </div>
        <div className="text-lg font-semibold leading-none text-muted-foreground lg:text-2xl">
          ${usdPrice}
        </div>
        <div className="flex items-center whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground lg:text-sm">
          Royalties 5%
        </div>
      </div>
    </div>
  );
}
