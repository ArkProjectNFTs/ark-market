import { formatUnits } from "viem";

import type { PropsWithClassName } from ".";
import { cn, ellipsableStyles } from ".";
import { Ethereum, Starknet } from "./icons";

interface PriceTagProps {
  price: string;
  currency: {
    contract: string;
    symbol: string;
    decimals: number;
  };
}

function CurrencyIcon({ symbol }: { symbol: string }) {
  switch (symbol) {
    case "STRK":
      return <Starknet className="size-5" />;
    case "ETH":
      return <Ethereum className="size-5" />;
    default:
      return null;
  }
}

export function PriceTag({
  className,
  price,
  currency,
}: PropsWithClassName<PriceTagProps>) {
  const formattedPrice = formatUnits(BigInt(price), currency.decimals);

  return (
    <div
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-xs bg-secondary px-3 font-medium",
        className,
      )}
    >
      <CurrencyIcon symbol={currency.symbol} />
      <p className={ellipsableStyles}>
        {formattedPrice}{" "}
        <span className="text-muted-foreground">{currency.symbol}</span>
      </p>
    </div>
  );
}
