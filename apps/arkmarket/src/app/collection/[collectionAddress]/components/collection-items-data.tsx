"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionTokensApiResponse,
} from "~/lib/getCollectionTokens";
import type { CollectionToken } from "~/types";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getCollectionTokens } from "~/lib/getCollectionTokens";
import CollectionItemsDataGridView from "./collection-items-data-grid-view";
import CollectionItemsDataListView from "./collection-items-data-list-view";
import LiveResultsIndicator from "./live-results-indicator";

interface CollectionItemsDataProps {
  collectionAddress: string;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  totalTokensCount: number;
  viewType: ViewType;
}

export default function CollectionItemsData({
  collectionAddress,
  sortBy,
  sortDirection,
  totalTokensCount,
  viewType,
}: CollectionItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      "collectionTokens",
      sortDirection,
      sortBy,
      collectionAddress,
    ] as const,
    refetchInterval: 10_000,
    getNextPageParam: (lastPage: CollectionTokensApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
      }),
  });
  console.log(infiniteData);

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  });

  const collectionTokens: CollectionToken[] = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LiveResultsIndicator
        className="p-6 lg:hidden"
        totalCount={totalTokensCount}
      />
      {viewType === "list" ? (
        <CollectionItemsDataListView collectionTokens={collectionTokens} />
      ) : (
        <CollectionItemsDataGridView
          className="mb-6"
          collectionTokens={collectionTokens}
          viewType={viewType}
        />
      )}
    </>
  );
}
