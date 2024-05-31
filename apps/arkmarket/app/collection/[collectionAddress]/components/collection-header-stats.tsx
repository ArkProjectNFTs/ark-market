import EtherIcon from "@ark-market/ui/components/icons/ether-icon";
import { Separator } from "@ark-market/ui/components/separator";
import { cn } from "@ark-market/ui/lib/utils";

import type { CollectionInfosApiResponse } from "../queries/getCollectionData";

interface CollectionHeaderStatsProps {
  collectionInfos: CollectionInfosApiResponse;
}

export default function CollectionHeaderStats({
  collectionInfos,
}: CollectionHeaderStatsProps) {
  return (
    <div className="flex h-12 items-center gap-6 pr-5">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Floor</p>
        <div className="flex items-center gap-1 font-medium">
          <EtherIcon />
          <p>{collectionInfos.floor ?? "_"} ETH</p>
          {/* TODO @YohanTz: Proper color */}
          <p
            className={cn(
              "text-sm font-semibold",
              collectionInfos.floor_7d_percentage < 0
                ? "text-red-500"
                : "text-green-500",
            )}
          >
            {collectionInfos.floor_7d_percentage >= 0 && "+"}
            {collectionInfos.floor_7d_percentage}%
          </p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Total Volume
        </p>
        <p className="font-medium">{collectionInfos.total_volume ?? "_"} ETH</p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">7D Volume</p>
        <p className="font-medium">
          {collectionInfos.volume_7d_eth ?? "_"} ETH
        </p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
        <p className="font-medium">{collectionInfos.total_sales}</p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Items</p>
        <p className="font-medium">{collectionInfos.token_count}</p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Owners</p>
        <p className="font-medium">{collectionInfos.owner_count}</p>
      </div>
    </div>
  );
}
