import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import { Button } from "@ark-market/ui/components/button";
import {
  NftCard,
  NftCardAction,
  NftCardContent,
  NftCardMedia,
} from "@ark-market/ui/components/nft-card";
import { cn, ellipsableStyles } from "@ark-market/ui/lib/utils";

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
            <NftCardMedia>
              {/* TODO: Media part of NftCardMedia */}
              <Media
                src={token.metadata?.image}
                alt={token.metadata?.name ?? "Empty"}
                className="aspect-square w-full transition-transform group-hover:scale-110"
              />
            </NftCardMedia>
            <NftCardContent>
              <div className="flex w-full justify-between">
                <div className="w-full overflow-hidden">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      viewType === "large-grid" && "sm:text-xl",
                      ellipsableStyles,
                    )}
                  >
                    {token.metadata?.name ?? token.token_id}
                  </p>
                  {token.list_price ? (
                    <p className={cn("mt-1 text-sm", ellipsableStyles)}>
                      {token.list_price} ETH
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
