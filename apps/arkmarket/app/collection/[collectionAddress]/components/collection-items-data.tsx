"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";
import type { CollectionTokensApiResponse } from "../queries/getCollectionData";
import { getCollectionTokens } from "../queries/getCollectionData";
import CollectionItemsDataListView from "./collection-items-data-list-view";

interface CollectionItemsDataProps {
  collectionAddress: string;
  collectionTokensInitialData: CollectionTokensApiResponse;
  sortDirection: CollectionSortDirection;
  sortBy: CollectionSortBy;
}
export default function CollectionItemsData({
  collectionAddress,
  collectionTokensInitialData,
  sortDirection,
  sortBy,
}: CollectionItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    // TODO @YohanTz: add sorting states to query key
    queryKey: ["collectionTokens", sortDirection],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialData: {
      pages: [collectionTokensInitialData],
      pageParams: [],
    },
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
      }),
  });

  const collectionTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data),
    [infiniteData],
  );

  if (collectionTokens === undefined) {
    // no-op
    return null;
  }

  return (
    <CollectionItemsDataListView
      collectionTokens={collectionTokens}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
