import Link from "next/link";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import { Share2, VerifiedIcon } from "@ark-market/ui/icons";

import type { Token } from "~/types";
import CopyButton from "~/components/copy-button";
import Media from "~/components/media";
import RefreshMetadataButton from "./refresh-metadata-button";
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
        mediaKey={token.metadata?.image_key}
        alt={
          token.metadata?.name ?? `${token.collection_name} #${token.token_id}`
        }
        className="aspect-square w-full rounded-lg object-contain"
        height={1000}
        width={1000}
        priority
      />
      <div className="flex flex-col lg:gap-0">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/collection/${token.collection_address}`}
            className={focusableStyles}
          >
            <h3 className="font-display text-xl leading-none text-primary">
              {token.collection_name}
            </h3>
          </Link>
          <VerifiedIcon className="size-6 text-primary" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p
            className={cn(
              "font-display w-full overflow-hidden text-2xl lg:text-3xl",
              ellipsableStyles,
            )}
          >
            {token.metadata?.name}
          </p>

          <div className="hidden items-center gap-6 lg:flex">
            <button className="flex size-6 text-[1.5rem]">
              <Share2
                className="size-6 text-muted-foreground transition-colors hover:text-foreground"
                weight={45}
              />
            </button>
            <CopyButton
              className="size-6 text-[1.5rem] text-muted-foreground transition-colors hover:text-foreground"
              textToCopy={token.collection_address}
              iconWeight={45}
            />
            <RefreshMetadataButton
              contractAddress={token.collection_address}
              tokenId={token.token_id}
              iconWeight={45}
            />
          </div>
          <div className="lg:hidden">
            <TokenSummaryMobileActions textToCopy={token.collection_address} />
          </div>
        </div>
      </div>
    </div>
  );
}
