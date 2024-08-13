import { forwardRef } from "react";
import Link from "next/link";
import { VirtuosoGrid } from "react-virtuoso";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles, formatUnits } from "@ark-market/ui";
import {
  NftCard,
  NftCardAction,
  NftCardContent,
  NftCardMedia,
} from "@ark-market/ui/nft-card";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type { CollectionToken } from "~/types";
import Media from "~/components/media";
import CollectionItemsBuyNow from "./collection-items-buy-now";

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
  collectionTokens: CollectionToken[];
  viewType: ViewType;
}

export default function CollectionItemsDataGridView({
  collectionTokens,
  className,
  viewType,
}: PropsWithClassName<CollectionItemsDataGridViewProps>) {
  return (
    <div className={className}>
      <VirtuosoGrid
        // initialItemCount same as totalCount but needed for SSR
        initialItemCount={collectionTokens.length}
        totalCount={collectionTokens.length}
        useWindowScroll
        components={{
          List:
            viewType === "large-grid" ? LargeGridContainer : SmallGridContainer,
        }}
        itemContent={(index) => {
          const token = collectionTokens[index];

          if (!token) {
            return null;
          }

          return (
            <Link
              href={`/token/${token.collection_address}/${token.token_id}`}
              key={`${token.collection_address}-${token.token_id}`}
              prefetch={false}
            >
              <NftCard>
                <NftCardMedia>
                  <Media
                    src={token.metadata?.image}
                    mediaKey={token.metadata?.image_key}
                    alt={token.metadata?.name ?? "Empty"}
                    className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
                    height={viewType === "large-grid" ? 540 : 340}
                    width={viewType === "large-grid" ? 540 : 340}
                  />
                </NftCardMedia>
                <NftCardContent>
                  <div className="flex w-full justify-between">
                    <div className="w-full">
                      <p
                        className={cn(
                          "font-semibold",
                          viewType === "large-grid" ? "text-xl" : "text-sm",
                          ellipsableStyles,
                        )}
                      >
                        {token.metadata?.name ?? token.token_id}
                      </p>
                      {token.price ? (
                        <p className={cn("mt-1 text-sm", ellipsableStyles)}>
                          {formatUnits(token.price, 18)} ETH
                        </p>
                      ) : (
                        <p className="mt-1 text-sm font-medium">Not for sale</p>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 h-5 text-sm font-medium text-secondary-foreground">
                    {token.last_price ? (
                      <>Last sale {formatUnits(token.last_price, 18)} ETH</>
                    ) : null}
                  </p>
                  {token.is_listed && !token.listing.is_auction ? (
                    <CollectionItemsBuyNow token={token} />
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
            </Link>
          );
        }}
      />
    </div>
  );
}
