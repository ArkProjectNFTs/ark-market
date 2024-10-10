import { Star } from "lucide-react";

import type { PropsWithClassName } from ".";
import { cn, ellipsableStyles, formatUnits } from ".";
import { Ethereum, Starknet } from "./icons";

interface PriceTagProps {
  price: number | bigint | string;
  currency: {
    contract: string;
    decimals: number;
    symbol: string;
  } | null;
}

function CurrencyIcon({ symbol }: { symbol: string }) {
  switch (symbol) {
    case "STRK":
      return <Starknet className="size-5" />;
    default:
    case "ETH":
      return <Ethereum className="size-5" />;
  }
}

export function PriceTag({
  className,
  price,
  currency,
}: PropsWithClassName<PriceTagProps>) {
  if (!price) {
    return null;
  }

  const parsedPrice = parseFloat(formatUnits(price, 18));

  return (
    <div
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-xs bg-secondary px-3 font-medium",
        className,
      )}
    >
      <CurrencyIcon symbol={currency?.symbol || "ETH"} />

      <p className={ellipsableStyles}>
        {isNaN(parsedPrice) ? formatUnits(price, 18) : parsedPrice.toFixed(5)}
        <span className="text-muted-foreground">{` ${currency?.symbol || "ETH"}`}</span>
      </p>
    </div>
  );
}
