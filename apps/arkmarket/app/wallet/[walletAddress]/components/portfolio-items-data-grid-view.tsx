import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import { cn } from "@ark-market/ui/lib/utils";

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
          <div className="rounded-xs w-full overflow-hidden bg-card text-card-foreground">
            <Media
              src={token.metadata?.image}
              alt={token.metadata?.name ?? "Empty"}
              className="aspect-square w-full"
            />
            <div className="p-3">
              <div className="flex w-full justify-between">
                <div>
                  <p
                    className={cn(
                      "font-semibold",
                      viewType === "large-grid" ? "text-xl" : "text-sm",
                    )}
                  >
                    {token.metadata?.name ?? token.token_id}
                  </p>
                  {token.list_price ? (
                    <p className="mt-1 text-sm">{token.list_price} ETH</p>
                  ) : (
                    <p className="mt-1 text-sm font-medium">Not for sale</p>
                  )}
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-secondary-foreground">
                Last sale _ ETH
              </p>
            </div>
          </div>
        );
      }}
    />
  );
}
