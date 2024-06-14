"use client";

import { useQueryState } from "nuqs";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Input } from "@ark-market/ui/components/input";
import {
  cn,
  ellipsableStyles,
  focusableStyles,
} from "@ark-market/ui/lib/utils";

import type { WalletCollectionsApiResponse } from "../queries/getWalletData";
import Media from "~/components/media";
import {
  walletCollectionFilterKey,
  walletCollectionFilterParser,
} from "../search-params";

interface PortfolioItemsFiltersContentProps {
  walletCollectionsInitialData: WalletCollectionsApiResponse;
  onFilterChange?: () => void;
}

export default function PortfolioItemsFiltersContent({
  className,
  walletCollectionsInitialData,
  onFilterChange,
}: PropsWithClassName<PortfolioItemsFiltersContentProps>) {
  const [collectionFilter, setCollectionFilter] = useQueryState(
    walletCollectionFilterKey,
    walletCollectionFilterParser,
  );

  return (
    <div className={className}>
      <div className="sticky top-0 bg-background">
        <div className="flex items-center">
          <h3 className="font-bold">All Collections </h3>
          <span>i</span>
        </div>
        <Input className="mt-5" placeholder="Search collection" />

        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <p>Collection</p>
          <p>Value</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {walletCollectionsInitialData.data.map((collection) => {
          return (
            <button
              key={collection.address}
              className={cn("flex h-9 justify-between gap-1", focusableStyles)}
              onClick={() => {
                void setCollectionFilter(collection.address);
                onFilterChange?.();
              }}
            >
              <div className="flex h-full items-center gap-2 overflow-hidden">
                <Media
                  src={collection.image ?? undefined}
                  alt={collection.collection_name}
                  className="rounded-xs h-8 w-8"
                />
                <div className="flex h-full flex-col items-start justify-between overflow-hidden">
                  <p className={cn("w-full text-sm", ellipsableStyles)}>
                    {collection.collection_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Listed: {collection.user_listed_tokens}/
                    {collection.user_token_count}
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col items-end justify-between">
                <p className="text-sm">{collection.floor}</p>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    ellipsableStyles,
                  )}
                >
                  Floor: {collection.floor}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
