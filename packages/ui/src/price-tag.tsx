import type { PropsWithClassName } from ".";
import { cn, formatUnits } from ".";
import EtherIcon from "./icons/ether-icon";

interface PriceTagProps {
  price: number | bigint;
}
export function PriceTag({
  className,
  price,
}: PropsWithClassName<PriceTagProps>) {
  return (
    <div
      className={cn(
        "rounded-xs inline-flex h-10 items-center gap-1 bg-secondary pl-1.5 pr-3",
        className,
      )}
    >
      <EtherIcon className="size-5" />
      <p className="whitespace-nowrap">
        {formatUnits(price, 18)}
        <span className="text-muted-foreground"> ETH</span>
      </p>
    </div>
  );
}
