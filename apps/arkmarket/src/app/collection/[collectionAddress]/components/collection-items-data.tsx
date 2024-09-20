"use client";

import { memo, useEffect, useMemo } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionTokensApiResponse,
} from "~/lib/getCollectionTokens";
import type { CollectionToken, Filters } from "~/types";
import { getCollectionTokens } from "~/lib/getCollectionTokens";
import CollectionItemsDataGridView from "./collection-items-data-grid-view";
import CollectionItemsDataListView from "./collection-items-data-list-view";

interface CollectionItemsDataProps {
  collectionAddress: string;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  viewType: ViewType;
  filters: Filters;
  searchQuery: string;
}

function CollectionItemsData({
  collectionAddress,
  sortBy,
  sortDirection,
  viewType,
  filters,
  searchQuery,
}: CollectionItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    // isFetchingNextPage,
    isRefetching,
  } = useSuspenseInfiniteQuery({
    queryKey: [
      "collectionTokens",
      sortDirection,
      sortBy,
      collectionAddress,
      filters,
    ],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage: CollectionTokensApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
        filters,
      }),
  });

  // useInfiniteWindowScroll({
  //   fetchNextPage,
  //   hasNextPage: !!hasNextPage,
  //   isFetchingNextPage,
  // });

  const collectionTokens: CollectionToken[] = useMemo(
    () =>
      infiniteData.pages
        .flatMap((page) => page.data)
        .filter((token) => token.token_id.includes(searchQuery)),
    [infiniteData, searchQuery],
  );

  const totalTokensCount = collectionTokens.length;

  useEffect(() => {
    const run = async () => {
      // console.log("totalTokensCount", totalTokensCount);
      if (
        isRefetching ||
        !hasNextPage ||
        !searchQuery ||
        !totalTokensCount ||
        totalTokensCount > 50
      ) {
        return;
      }

      console.log("fetchNextPage > ", searchQuery, totalTokensCount);
      // if (searchQuery && totalTokensCount < 10 && hasNextPage) {
      await fetchNextPage({ cancelRefetch: false });
      // }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, totalTokensCount]);

  console.log("CollectionItemsData.render");

  if (collectionTokens.length === 0) {
    return (
      <div className="p-5">
        <div className="text-xl font-semibold">No items found.</div>
        <div className="mb-5 text-muted-foreground">
          Try updating your search criteria to find what you're looking for.
        </div>
      </div>
    );
  }

  return viewType === "list" ? (
    <CollectionItemsDataListView collectionTokens={collectionTokens} />
  ) : (
    <CollectionItemsDataGridView
      collectionTokens={collectionTokens}
      viewType={viewType}
    />
  );
}

export default memo(CollectionItemsData);
