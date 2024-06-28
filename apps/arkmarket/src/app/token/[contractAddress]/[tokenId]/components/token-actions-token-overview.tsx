import { BadgeCheck } from "lucide-react";

import type { Token } from "~/types";
import TokenMedia from "~/app/assets/[contract_address]/[token_id]/components/token-media";

interface tokenActionsTokenOverviewProps {
  token: Token;
  amount: string;
}

export default function TokenActionsTokenOverview({
  token,
  amount,
}: tokenActionsTokenOverviewProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="size-24 overflow-hidden rounded-xl">
        <TokenMedia token={token} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold">Duo #{token.token_id}</div>
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-muted-foreground">
            Everai
          </div>
          <BadgeCheck className="size-4 text-muted-foreground" />
        </div>
      </div>
      <div className="grow" />
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold">{amount || "---"} ETH</div>
        <div className="text-right text-lg font-semibold text-muted-foreground">
          $---
        </div>
      </div>
    </div>
  );
}
