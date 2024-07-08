import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import { cn } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";

import type { Collection, Token } from "~/types";
import TokenMedia from "~/app/assets/[contract_address]/[token_id]/components/token-media";

interface tokenActionsTokenOverviewProps {
  collection: Collection;
  token: Token;
  amount: string;
  small?: boolean;
}

export default function TokenActionsTokenOverview({
  collection,
  token,
  amount,
  small,
}: tokenActionsTokenOverviewProps) {
  return (
    <div className="flex space-x-4">
      <div
        className={cn(
          "size-24 overflow-hidden rounded-xl",
          small ? "size-16" : "size-24",
        )}
      >
        <TokenMedia token={token} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-xl font-semibold">#{token.token_id}</div>
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-muted-foreground">
            {collection.name || "Unknown"}
          </div>
          <VerifiedIcon className="size-6 text-background" />
        </div>
        <div className="flex h-6 items-center justify-center rounded-2xl bg-secondary text-[12px] text-secondary-foreground">
          Royalties 5%
        </div>
      </div>
      <div className="grow" />
      <div className="flex flex-col gap-1">
        <div className="flex text-xl font-semibold">
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
