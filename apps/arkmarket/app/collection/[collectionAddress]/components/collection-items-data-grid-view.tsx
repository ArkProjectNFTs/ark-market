import { forwardRef, useCallback, useEffect } from "react";
import { VirtuosoGrid } from "react-virtuoso";

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
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  viewType: ViewType;
}

export default function CollectionItemsDataGridView({
  collectionTokens,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  viewType,
}: CollectionItemsDataGridViewProps) {
  const fetchMoreOnBottomReached = useCallback(() => {
    if (document.body) {
      const { scrollHeight } = window.document.body;
      // Once the user has scrolled within 400px of the bottom of the window, fetch more data if possible
      if (
        scrollHeight - window.scrollY - window.innerHeight < 400 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        void fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // TODO @YohanTz: Replace with framer-motion
  // A check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached();

    window.addEventListener("scroll", fetchMoreOnBottomReached);
    return () => {
      window.removeEventListener("scroll", fetchMoreOnBottomReached);
    };
  }, [fetchMoreOnBottomReached]);

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
          <div className="rounded-xs w-full overflow-hidden bg-card text-card-foreground">
            <Media
              src={collectionToken.metadata?.image}
              alt={collectionToken.metadata?.name ?? "Empty"}
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
                    {collectionToken.metadata?.name ?? collectionToken.token_id}
                  </p>
                  {collectionToken.price ? (
                    <p className="mt-1 text-sm">{collectionToken.price} ETH</p>
                  ) : (
                    <p className="mt-1 text-sm font-medium">Not for sale</p>
                  )}
                </div>
                {/* <div className="flex h-5 items-center justify-center rounded-[0.25rem] border border-border px-2">
                  <span className="text-xs">{collectionToken.token_id}</span>
                </div> */}
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
