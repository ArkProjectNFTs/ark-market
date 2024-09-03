"use client";

import { useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { validateAndParseAddress } from "starknet";

import type { PropsWithClassName } from "@ark-market/ui";
import {
  cn,
  ellipsableStyles,
  focusableStyles,
  formatNumber,
  formatUnits,
} from "@ark-market/ui";
import { VerifiedIcon } from "@ark-market/ui/icons";
import { Input } from "@ark-market/ui/input";

import type { WalletCollectionsApiResponse } from "../queries/getWalletData";
import Media from "~/components/media";
import { getWalletCollections } from "../queries/getWalletData";
import {
  walletCollectionFilterKey,
  walletCollectionFilterParser,
} from "../search-params";

interface PortfolioItemsFiltersContentProps {
  walletAddress: string;
  // walletCollectionsInitialData: WalletCollectionsApiResponse;
  onFilterChange?: () => void;
}

export default function PortfolioItemsFiltersContent({
  className,
  // walletCollectionsInitialData,
  walletAddress,
  onFilterChange,
}: PropsWithClassName<PortfolioItemsFiltersContentProps>) {
  const [collectionFilter, setCollectionFilter] = useQueryState(
    walletCollectionFilterKey,
    walletCollectionFilterParser,
  );

  const {
    data: infiniteData,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletCollections", walletAddress],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage: WalletCollectionsApiResponse) =>
      lastPage.next_page,
    // initialData: {
    //   pages: [walletCollectionsInitialData],
    //   pageParams: [],
    // },
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletCollections({
        page: pageParam,
        walletAddress,
      }),
  });

  const isCollectionSelected = useCallback(
    (collectionAddress: string): boolean => {
      try {
        const parsedCollectionAddress =
          validateAndParseAddress(collectionAddress);
        const parsedFilterAddress = validateAndParseAddress(
          collectionFilter ?? "",
        );
        return parsedCollectionAddress === parsedFilterAddress;
      } catch (error) {
        console.error("Error parsing addresses:", error);
        return false;
      }
    },
    [collectionFilter],
  );

  const handleCollectionClick = useCallback(
    (collectionAddress: string): void => {
      if (isCollectionSelected(collectionAddress)) {
        void setCollectionFilter(null);
      } else {
        void setCollectionFilter(collectionAddress);
      }
      onFilterChange?.();
    },
    [isCollectionSelected, setCollectionFilter, onFilterChange],
  );

  const walletCollections = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  return (
    <div className={className}>
      <div className="sticky top-0 mx-[1px] bg-background">
        <div className="flex items-center gap-2">
          <h3 className="font-bold">All Collections </h3>
          {infiniteData?.pages[0]?.collection_count !== undefined && (
            <span className="flex h-5 items-center rounded-full bg-secondary px-1.5 text-xs font-medium text-secondary-foreground">
              {formatNumber(infiniteData.pages[0]?.collection_count)}
            </span>
          )}
        </div>
        <Input className="mt-5" placeholder="Search collection" />

        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <p>Collection</p>
          <p>Value</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {walletCollections.map((collection) => {
          const isSelected = isCollectionSelected(collection.address);
          return (
            <button
              key={collection.address}
              className={cn(
                "flex justify-between gap-1 rounded-xs px-2 py-1 font-medium transition-colors hover:bg-card",
                isSelected && "bg-card",
                focusableStyles,
              )}
              onClick={() => handleCollectionClick(collection.address)}
            >
              <div className="flex h-full items-center gap-2 overflow-hidden">
                <Media
                  src={collection.image ?? undefined}
                  alt={collection.name}
                  className="h-8 w-8 rounded-xs object-contain"
                />
                <div className="flex h-full flex-col items-start justify-between overflow-hidden">
                  <div className="flex w-full items-center gap-1">
                    <p
                      className={cn(
                        "w-full text-left text-sm",
                        ellipsableStyles,
                      )}
                    >
                      {collection.name}
                    </p>
                    <VerifiedIcon className="size-3 flex-shrink-0 text-primary" />
                  </div>
                  <p
                    className={cn(
                      "text-xs text-muted-foreground",
                      ellipsableStyles,
                    )}
                  >
                    Listed: {collection.user_listed_tokens}/
                    {collection.user_token_count}
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col items-end justify-between">
                <p className="text-sm">
                  {formatUnits(
                    collection.user_token_count * (collection.floor ?? 0),
                    18,
                  )}
                </p>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    ellipsableStyles,
                  )}
                >
                  Floor: {formatUnits(collection.floor ?? 0n, 18)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
