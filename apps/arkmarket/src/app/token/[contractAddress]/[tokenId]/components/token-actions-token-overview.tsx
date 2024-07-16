import { cn } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import type { Token } from "~/types";
import Media from "~/components/media";

interface tokenActionsTokenOverviewProps {
  token: Token;
  amount: string;
  small?: boolean;
}

export default function TokenActionsTokenOverview({
  token,
  amount,
  small,
}: tokenActionsTokenOverviewProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <Media
          src={token.metadata?.image}
          mediaKey={token.metadata?.image_key}
          alt={token.metadata?.name ?? "Empty"}
          className={cn(
            "aspect-square w-full flex-shrink-0 object-contain transition-transform group-hover:scale-110",
            "overflow-hidden rounded-xl",
            small ? "size-16" : "size-14 sm:size-24",
          )}
        />
      </div>
      <div className="flex flex-col items-start justify-between">
        <div className="text-xl font-semibold">#{token.token_id}</div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-muted-foreground sm:text-lg">
            {token.collection_name || "Unknown"}
          </div>
          <VerifiedIcon className="size-6 text-background" />
        </div>
        {small ?? (
          <div className="flex h-6 items-center justify-center rounded-full bg-secondary px-2 text-xs font-medium text-secondary-foreground">
            Royalties 5%
          </div>
        )}
      </div>
      <div className="grow" />
      <div className="flex flex-col gap-1">
        <div className="flex text-lg font-semibold sm:text-xl">
          <EthereumLogo2 className="size-6" />
          {amount || "---"} ETH
        </div>
        <div className="text-right text-lg font-semibold text-muted-foreground">
          $---
        </div>
      </div>
    </div>
  );
}
