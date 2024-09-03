import { parseEther } from "viem";

import { cn, ellipsableStyles } from "@ark-market/ui";
import { Ethereum, VerifiedIcon } from "@ark-market/ui/icons";

import type { WalletToken } from "~/app/wallet/[walletAddress]/queries/getWalletData";
import type { CollectionToken, Token } from "~/types";
import Media from "~/components/media";
import usePrices from "~/hooks/usePrices";
import formatAmount from "~/lib/formatAmount";

interface tokenActionsTokenOverviewProps {
  token: Token | CollectionToken | WalletToken;
  amount: string;
  small?: boolean;
}

export default function TokenActionsTokenOverview({
  token,
  amount,
  small,
}: tokenActionsTokenOverviewProps) {
  const { convertInUsd } = usePrices();

  const formattedAmount = formatAmount(amount);
  const ethAmountInUsd = convertInUsd({ amount: parseEther(amount) });

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Media
          src={token.metadata?.image}
          mediaKey={token.metadata?.image_key}
          alt={token.metadata?.name ?? "Empty"}
          className={cn(
            "aspect-square w-full flex-shrink-0 object-contain transition-transform group-hover:scale-110",
            "overflow-hidden rounded-xl",
            small ? "size-16" : "size-16 sm:size-24",
          )}
          height={192}
          width={192}
        />

        <div className="flex flex-col items-start justify-between overflow-hidden">
          <div className={cn("w-full text-xl font-semibold", ellipsableStyles)}>
            {token.metadata?.name ?? `#${token.token_id}`}
          </div>
          <div className="flex w-full items-center gap-1 sm:gap-2">
            <p
              className={cn(
                "text-sm font-semibold text-muted-foreground sm:text-lg",
                ellipsableStyles,
              )}
            >
              {token.collection_name || "Unknown"}
            </p>
            <VerifiedIcon className="size-4 flex-shrink-0 text-primary sm:size-6" />
          </div>
          {small ?? (
            <div
              className={cn(
                "w-full items-center rounded-full text-xs font-medium text-secondary-foreground sm:mt-4 sm:flex sm:h-6 sm:w-auto sm:bg-secondary sm:px-2",
                ellipsableStyles,
              )}
            >
              Royalties 5%
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center justify-center whitespace-nowrap text-lg font-semibold sm:text-xl">
          <Ethereum className="size-6" />
          {formattedAmount || "---"} ETH
        </div>
        <div className="overflow-hidden text-clip text-right text-sm font-semibold text-muted-foreground">
          ${ethAmountInUsd || "---"}
        </div>
      </div>
    </div>
  );
}
