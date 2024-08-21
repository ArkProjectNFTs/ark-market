import type { PropsWithClassName } from "@ark-market/ui";
import { cn, formatNumber, formatUnits } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import { Separator } from "@ark-market/ui/separator";
import { Typography } from "@ark-market/ui/typography";

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
      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <Typography className="text-muted-foreground" variant="body_s">
          Floor
        </Typography>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <Typography variant="body_bold_s">
            {formatUnits(collection.floor ?? 0, 18)} ETH
          </Typography>
          {/* TODO @YohanTz: Proper color */}
          {/* <Typography
            variant="button_text_s"
            className={collection.floor_7d_percentage < 0
                ? "text-red-500"
                : "text-green-500",
            }
          >
            {collection.floor_7d_percentage >= 0 && "+"}
            {formatNumber(collection.floor_7d_percentage)}%
          </Typography> */}
        </div>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <Typography className="text-muted-foreground" variant="body_s">
          Total Volume
        </Typography>
        <div className="flex items-center ">
          <EthereumLogo2 className="size-5" />
          <Typography variant="body_bold_s">
            {formatNumber(collection.total_volume)} ETH
          </Typography>
        </div>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <Typography className="text-muted-foreground" variant="body_s">
          7D Volume
        </Typography>
        <div className="flex items-center gap-1">
          <EthereumLogo2 className="size-5" />
          <p className="font-medium">
            {formatNumber(collection.volume_7d_eth)} ETH
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <Typography className="text-muted-foreground" variant="body_s">
          Total Sales
        </Typography>
        <p className="font-medium">{formatNumber(collection.total_sales)}</p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <Typography className="text-muted-foreground" variant="body_s">
          Items
        </Typography>
        <p className="font-medium">{formatNumber(collection.token_count)}</p>
      </div>
      <Separator orientation="vertical" className={separatorCommonClassNames} />

      <div className="rounded-lg bg-card p-3.5 md:bg-transparent md:p-0">
        <Typography className="text-muted-foreground" variant="body_s">
          Owners
        </Typography>
        <p className="font-medium">{formatNumber(collection.owner_count)}</p>
      </div>
    </div>
  );
}
