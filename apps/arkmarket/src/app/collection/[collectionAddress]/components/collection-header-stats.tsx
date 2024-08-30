import { formatNumber, formatUnits } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import { Separator } from "@ark-market/ui/separator";

import type { Collection } from "~/types";

interface CollectionHeaderStatsProps {
  collection: Collection;
}

export default function CollectionHeaderStats({
  collection,
}: CollectionHeaderStatsProps) {
  return (
    // mt-8 xl:hidden
    <div className="hidden grid-cols-2 items-center justify-between gap-2 md:flex md:h-12 md:gap-6 md:pr-5 xl:flex">
      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Floor</p>
        <div className="flex items-center gap-2 font-medium font-numbers text-xl">
          <EthereumLogo2 className="size-5" />
          <p>{formatUnits(collection.floor ?? 0, 18)} ETH</p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">
          Total Volume
        </p>
        <div className="flex items-center font-numbers gap-2 text-xl">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatNumber(collection.total_volume)} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">7D Volume</p>
        <div className="flex items-center gap-2 font-numbers text-xl">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatNumber(collection.volume_7d_eth)} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
        <p className="font-medium font-numbers text-xl">{formatNumber(collection.total_sales)}</p>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Items</p>
        <p className="font-medium font-numbers text-xl">{formatNumber(collection.token_count)}</p>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <p className="text-sm font-medium text-muted-foreground">Owners</p>
        <p className="font-medium font-numbers text-xl">{formatNumber(collection.owner_count)}</p>
      </div>
    </div>
  );
}
