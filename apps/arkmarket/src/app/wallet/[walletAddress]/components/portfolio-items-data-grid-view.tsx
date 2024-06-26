import { forwardRef } from "react";
import Link from "next/link";
import { VirtuosoGrid } from "react-virtuoso";

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
}

export default function CollectionItemsDataGridView({
  walletTokens,
  viewType,
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
        if (token === undefined) {
          return null;
        }
        return (
          // TODO @YohanTz: Extract to NftCard component and sub-components
          <NftCard>
            <Link
              href={`/assets/${token.contract}/${token.token_id}`}
              className={cn("flex items-center gap-1", focusableStyles)}
            >
              <NftCardMedia>
                {/* TODO: Media part of NftCardMedia */}
                <Media
                  alt={token.metadata?.name ?? "Empty"}
                  className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
                  src={token.metadata?.image ?? token.metadata?.animation_url}
                  mediaKey={
                    token.metadata?.animation_key ?? token.metadata?.image_key
                  }
                />
              </NftCardMedia>
            </Link>
            <NftCardContent>
              <div className="flex w-full justify-between">
                <div className="w-full space-y-1 overflow-hidden">
                  <Link
                    href={`/assets/${token.contract}/${token.token_id}`}
                    className={cn("flex items-center gap-1", focusableStyles)}
                  >
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        viewType === "large-grid" && "sm:text-xl",
                        ellipsableStyles,
                      )}
                    >
                      {token.metadata?.name ?? token.token_id}
                    </p>
                  </Link>
                  <Link
                    href={`/collection/${token.contract}`}
                    className={cn("flex items-center gap-1", focusableStyles)}
                  >
                    <p
                      className={cn(
                        "text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground",
                        viewType === "large-grid" && "sm:text-lg",
                        ellipsableStyles,
                      )}
                    >
                      {token.collection_name}
                    </p>
                    <VerifiedIcon className="size-6 flex-shrink-0 text-background" />
                  </Link>

                  {token.list_price ? (
                    <p className={cn("mt-1 text-sm", ellipsableStyles)}>
                      {formatUnits(token.list_price, 18)} ETH
                    </p>
                  ) : (
                    <p className="mt-1 text-sm font-medium">Not for sale</p>
                  )}
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-secondary-foreground">
                Last sale _ ETH
              </p>
              <NftCardAction>List</NftCardAction>
            </NftCardContent>
          </NftCard>
        );
      }}
    />
  );
}
