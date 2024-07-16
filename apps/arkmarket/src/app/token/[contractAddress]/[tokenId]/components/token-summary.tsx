import Link from "next/link";
import { RefreshCw, Share2 } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import type { Token } from "~/types";
import CopyButton from "~/components/copy-button";
import Media from "~/components/media";
import TokenSummaryMobileActions from "./token-summary-mobile-actions";

interface TokenSummaryProps {
  token: Token;
}

export default function TokenSummary({
  className,
  token,
}: PropsWithClassName<TokenSummaryProps>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 font-semibold lg:flex-col lg:gap-8",
        className,
      )}
    >
      <Media
        src={token.metadata?.animation_url ?? token.metadata?.image}
        mediaKey={token.metadata?.animation_key ?? token.metadata?.image_key}
        alt={
          token.metadata?.name ?? `${token.collection_name} #${token.token_id}`
        }
        className="aspect-square w-full rounded-lg object-contain"
        height={1000}
        width={1000}
      />
      <div className="flex flex-col lg:gap-4">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/collection/${token.collection_address}`}
            className={focusableStyles}
          >
            <h3 className="text-lg text-muted-foreground">
              {token.collection_name}
            </h3>
          </Link>
          <VerifiedIcon className="size-6 text-background" />
        </div>
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "w-full overflow-hidden text-2xl lg:text-3xl",
              ellipsableStyles,
            )}
          >
            {token.metadata?.name}
          </p>

          <div className="hidden items-center gap-6 lg:flex">
            <Share2 className="size-6 text-muted-foreground" />
            <CopyButton
              className="size-6 text-muted-foreground"
              textToCopy={token.collection_address}
            />
            <RefreshCw className="size-6 text-muted-foreground" />
          </div>
          <div className="lg:hidden">
            <TokenSummaryMobileActions textToCopy={contractAddress} />
          </div>
        </div>
      </div>
    </div>
  );
}
