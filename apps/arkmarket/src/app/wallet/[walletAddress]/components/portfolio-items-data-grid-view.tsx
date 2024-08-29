import { forwardRef } from "react";
import Link from "next/link";
import { VirtuosoGrid } from "react-virtuoso";
import { formatEther } from "viem";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  formatUnits,
} from "@ark-market/ui";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";
import {
  NftCard,
  NftCardAction,
  NftCardContent,
  NftCardMedia,
} from "@ark-market/ui/nft-card";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type { WalletToken } from "../queries/getWalletData";
import { TokenActionsCreateListing } from "~/app/token/[contractAddress]/[tokenId]/components/token-actions-create-listing";
import Media from "~/components/media";

const LargeGridContainer = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className="mb-2 grid w-full grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] sm:gap-2"
  >
    {children}
  </div>
));
LargeGridContainer.displayName = "LargeGridContainer";

const SmallGridContainer = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className="mb-2 grid w-full grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] sm:gap-2"
  >
    {children}
  </div>
));
SmallGridContainer.displayName = "SmallGridContainer";

interface CollectionItemsDataGridViewProps {
  walletTokens: WalletToken[];
  viewType: ViewType;
  isOwner: boolean;
}

export default function CollectionItemsDataGridView({
  walletTokens,
  viewType,
  isOwner,
}: CollectionItemsDataGridViewProps) {
  return (
    <VirtuosoGrid
      // initialItemCount same as totalCount but needed for SSR
      initialItemCount={walletTokens.length}
      totalCount={walletTokens.length}
      useWindowScroll
      components={{
        List:
          viewType === "large-grid" ? LargeGridContainer : SmallGridContainer,
      }}
      itemContent={(index) => {
        const token = walletTokens[index];
        console.log(token);
        if (token === undefined) {
          return null;
        }
        const canListItem = isOwner && !token.list_price;

        return (
          // TODO @YohanTz: Extract to NftCard component and sub-components
          <NftCard>
            <Link
              href={`/token/${token.collection_address}/${token.token_id}`}
              className={cn("flex items-center gap-1", focusableStyles)}
            >
              <NftCardMedia>
                {/* TODO: Media part of NftCardMedia */}
                <Media
                  alt={token.metadata?.name ?? "Empty"}
                  className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
                  src={token.metadata?.image}
                  mediaKey={token.metadata?.image_key}
                  height={viewType === "large-grid" ? 540 : 340}
                  width={viewType === "large-grid" ? 540 : 340}
                />
              </NftCardMedia>
            </Link>
            <NftCardContent>
              <div className="flex w-full justify-between">
                <div className="w-full overflow-hidden">
                  <Link
                    href={`/token/${token.collection_address}/${token.token_id}`}
                    className={cn("flex items-center gap-1", focusableStyles)}
                  >
                    <p
                      className={cn(
                        "text-base font-bold leading-none",
                        viewType === "large-grid" && "sm:text-xl font-bold",
                        ellipsableStyles,
                      )}
                    >
                      {token.metadata?.name ?? token.token_id}
                    </p>
                  </Link>
                  <Link
                    href={`/collection/${token.collection_address}`}
                    className={cn("flex items-center gap-1", focusableStyles)}
                  >
                    <p
                      className={cn(
                        "mt-0.5 text-sm font-normal text-accent-foreground transition-colors hover:text-foreground leading-none",
                        viewType === "large-grid" && "sm:text-base",
                        ellipsableStyles,
                      )}
                    >
                      {token.collection_name}
                    </p>
                    <VerifiedIcon className="size-6 flex-shrink-0 text-background" />
                  </Link>

                  {token.list_price ? (
                    <p className={cn("mt-2 text-sm font-semibold", ellipsableStyles)}>
                      {formatUnits(token.list_price, 18)} ETH
                    </p>
                  ) : (
                    <p className="mt-2 text-sm font-semibold">Not for sale</p>
                  )}
                </div>
              </div>
              <div className="mt-5 h-5">
                {token.last_price ? (
                  <p className="mt-5 text-sm font-medium text-secondary-foreground">
                    Last sale {formatEther(BigInt(token.last_price))} ETH
                  </p>
                ) : null}
              </div>
              {canListItem ? (
                <TokenActionsCreateListing token={token}>
                  <NftCardAction>List for sale</NftCardAction>
                </TokenActionsCreateListing>
              ) : (
                <NftCardAction asChild>
                  <Link
                    href={`/token/${token.collection_address}/${token.token_id}`}
                  >
                    Details
                  </Link>
                </NftCardAction>
              )}
            </NftCardContent>
          </NftCard>
        );
      }}
    />
  );
}
