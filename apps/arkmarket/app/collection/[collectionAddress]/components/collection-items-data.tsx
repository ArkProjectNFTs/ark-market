"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";
import type { CollectionTokensApiResponse } from "../queries/getCollectionData";
import type { ViewType } from "./view-type-toggle-group";
import { getCollectionTokens } from "../queries/getCollectionData";
import CollectionItemsDataGridView from "./collection-items-data-grid-view";
import CollectionItemsDataListView from "./collection-items-data-list-view";

interface CollectionItemsDataProps {
  collectionAddress: string;
  collectionTokensInitialData: CollectionTokensApiResponse;
  sortDirection: CollectionSortDirection;
  sortBy: CollectionSortBy;
  viewType: ViewType;
}
export default function CollectionItemsData({
  collectionAddress,
  collectionTokensInitialData,
  sortDirection,
  sortBy,
  viewType,
}: CollectionItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    // TODO @YohanTz: add filters states to query key
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

  console.log(infiniteData);
  const collectionTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data),
    [infiniteData],
  );

  if (collectionTokens === undefined) {
    // no-op
    return null;
  }

  if (viewType === "list") {
    return (
      <CollectionItemsDataListView
        collectionTokens={collectionTokens}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    );
  }

  return (
    <CollectionItemsDataGridView
      collectionTokens={collectionTokens}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      viewType={viewType}
    />
  );
}
