/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-constant-condition */
import type { PropsWithClassName } from "@ark-market/ui";
import { cn, formatNumber, formatUnits } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import { Separator } from "@ark-market/ui/separator";

export default function TokenStats({ className }: PropsWithClassName) {
  return (
    <div
      className={cn("flex h-14 items-center justify-between gap-4", className)}
    >
      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">
          Collection Floor
        </p>
        <div className="flex items-center gap-1 font-medium">
          <EthereumLogo2 className="size-5" />
          <p>{formatUnits(1000000000000000000n, 18)} ETH</p>
          {/* TODO @YohanTz: Proper color */}
          <p
            className={cn(
              "text-sm font-semibold",
              1 < 0 ? "text-red-500" : "text-green-500",
            )}
          >
            {12 >= 0 && "+"}
            {formatNumber(12)}%
          </p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">Last sale</p>
        <div className="flex items-center ">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">{formatNumber(0.31)} ETH</p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">Top offer</p>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">{formatNumber(12)} ETH</p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div className="flex w-full flex-col gap-2 rounded-lg">
        <p className="text-sm font-medium text-muted-foreground">Owner</p>
        <p className="text-sm font-medium">
          Owned by <span className="text-muted-foreground">0x0000...0000</span>
        </p>
      </div>
    </div>
  );
}
