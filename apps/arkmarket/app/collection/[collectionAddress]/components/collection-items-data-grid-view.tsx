import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import {
  NftCard,
  NftCardAction,
  NftCardContent,
  NftCardMedia,
} from "@ark-market/ui/components/nft-card";
import { cn } from "@ark-market/ui/lib/utils";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type { CollectionToken } from "../queries/getCollectionData";
import Media from "~/components/media";

const LargeGridContainer = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className="mb-2 grid w-full grid-cols-2 gap-2 p-6 sm:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]"
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
    className="mb-2 grid w-full grid-cols-2 gap-2 p-6 sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]"
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
  return (
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
        const collectionToken = collectionTokens[index];
        if (collectionToken === undefined) {
          return null;
        }

        return (
          // TODO @YohanTz: Extract to NftCard component and sub-components
          <NftCard>
            <NftCardMedia>
              <Media
                src={collectionToken.metadata?.image}
                alt={collectionToken.metadata?.name ?? "Empty"}
                className="aspect-square w-full"
              />
            </NftCardMedia>
            <NftCardContent>
              <div className="flex w-full justify-between">
                <div>
                  <p
                    className={cn(
                      "font-semibold",
                      viewType === "large-grid" ? "text-xl" : "text-sm",
                    )}
                  >
                    {collectionToken.metadata?.name ?? collectionToken.token_id}
                  </p>
                  {collectionToken.price ? (
                    <p className="mt-1 text-sm">{collectionToken.price} ETH</p>
                  ) : (
                    <p className="mt-1 text-sm font-medium">Not for sale</p>
                  )}
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-secondary-foreground">
                Last sale _ ETH
              </p>
              <NftCardAction>Details</NftCardAction>
            </NftCardContent>
          </NftCard>
        );
      }}
    />
  );
}
