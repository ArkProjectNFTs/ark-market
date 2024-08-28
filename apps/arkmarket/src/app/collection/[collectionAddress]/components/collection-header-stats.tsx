import type { PropsWithClassName } from "@ark-market/ui";
import { cn, formatNumber, formatUnits } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import { Separator } from "@ark-market/ui/separator";

import type { Collection } from "~/types";

const separatorCommonClassNames = "hidden md:block";

interface CollectionHeaderStatsProps {
  collection: Collection;
}

export default function CollectionHeaderStats({
  className,
  collection,
}: PropsWithClassName<CollectionHeaderStatsProps>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 items-center justify-between gap-2 md:flex md:h-12 md:gap-6 md:pr-5",
        className,
      )}
    >
      <div className="rounded-lg p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Floor</p>
        <div className="flex items-center gap-1 font-medium">
          <EthereumLogo2 className="size-5" />
          <p>{formatUnits(collection.floor ?? 0, 18)} ETH</p>
          {/* TODO @YohanTz: Proper color */}
          {/* <p
            className={cn(
              "text-sm font-semibold",
              collection.floor_7d_percentage < 0
                ? "text-red-500"
                : "text-green-500",
            )}
          >
            {collection.floor_7d_percentage >= 0 && "+"}
            {formatNumber(collection.floor_7d_percentage)}%
          </p> */}
        </div>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">
          Total Volume
        </p>
        <div className="flex items-center ">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatNumber(collection.total_volume)} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">7D Volume</p>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatNumber(collection.volume_7d_eth)} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
        <p className="font-medium">{formatNumber(collection.total_sales)}</p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Items</p>
        <p className="font-medium">{formatNumber(collection.token_count)}</p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Owners</p>
        <p className="font-medium">{formatNumber(collection.owner_count)}</p>
      </div>
    </div>
  );
}
