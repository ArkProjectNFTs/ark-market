import type { PropsWithClassName } from ".";
import { cn, formatUnits } from ".";
import EthereumLogo2 from "./icons/ethereum-logo-2";

interface PriceTagProps {
  price: number | bigint | string;
}
export function PriceTag({
  className,
  price,
}: PropsWithClassName<PriceTagProps>) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-xs bg-secondary px-3 font-medium",
        className,
      )}
    >
      <EthereumLogo2 className="size-5" />
      <p className="whitespace-nowrap">
        {formatUnits(price, 18)}
        <span className="text-muted-foreground"> ETH</span>
      </p>
    </div>
  );
}
