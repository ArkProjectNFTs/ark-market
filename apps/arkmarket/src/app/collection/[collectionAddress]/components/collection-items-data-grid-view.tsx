import { forwardRef } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { VirtuosoGrid } from "react-virtuoso";

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
  viewType,
}: CollectionItemsDataGridViewProps) {
  const components = {
    List: viewType === "large-grid" ? LargeGridContainer : SmallGridContainer,
  };

  return (
    <div className="mb-6">
      <VirtuosoGrid
        initialItemCount={collectionTokens.length}
        totalCount={collectionTokens.length}
        useWindowScroll
        components={components}
        itemContent={(index) => {
          const token = collectionTokens[index];

          if (!token) {
            return null;
          }

          return (
            <NftCard>
              <Link
                href={`/token/${token.collection_address}/${token.token_id}`}
                key={`${token.collection_address}-${token.token_id}`}
                prefetch={false}
              >
                <NftCardMedia>
                  <Media
                    src={token.metadata?.image}
                    mediaKey={token.metadata?.image_key}
                    thumbnailKey={token.metadata?.image_key_540_540}
                    alt={token.metadata?.name ?? "Empty"}
                    className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
                    height={viewType === "large-grid" ? 540 : 340}
                    width={viewType === "large-grid" ? 540 : 340}
                  />
                </NftCardMedia>
                <NftCardContent>
                  <div className="flex w-full justify-between">
                    <div className="w-full">
                      <div
                        className={cn(
                          "font-bold",
                          viewType === "large-grid" ? "text-xl" : "text-sm",
                          ellipsableStyles,
                        )}
                      >
                        {token.metadata?.name ?? token.token_id}
                      </div>
                      {token.price ? (
                        <div
                          className={cn(
                            "font-medium",
                            viewType === "large-grid" ? "text-sm" : "text-xs",
                            ellipsableStyles,
                          )}
                        >
                          {formatUnits(token.price, 18)}{" "}
                          <span className="text-muted-foreground"></span>
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "font-medium",
                            viewType === "large-grid" ? "text-sm" : "text-xs",
                            ellipsableStyles,
                          )}
                        >
                          Not for sale
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-5 h-5 text-sm font-medium text-secondary-foreground">
                    {token.last_price ? (
                      <>
                        Last {viewType === "large-grid" ? "sale" : ""}{" "}
                        {formatUnits(token.last_price, 18)}
                      </>
                    ) : null}
                  </p>
                </NftCardContent>
              </Link>
              {token.buy_in_progress ? (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 flex h-10 w-full items-center justify-between gap-2 bg-primary px-3 font-medium text-background",
                    viewType === "large-grid" ? "text-sm" : "text-sm",
                  )}
                >
                  <span className="leading-none">Buy in progress</span>
                  <LoaderCircle className="left-4 size-4 animate-spin" />
                </div>
              ) : token.is_listed && !token.listing.is_auction ? (
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
            </NftCard>
          );
        }}
      />
    </div>
  );
}
