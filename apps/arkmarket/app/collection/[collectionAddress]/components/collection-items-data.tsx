"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";
import type { CollectionTokensApiResponse } from "../queries/getCollectionData";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
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
    queryKey: ["collectionTokens", sortDirection, sortBy, collectionAddress],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialData: {
      pages: [collectionTokensInitialData],
      pageParams: [],
    },
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
      }),
  });

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  });

  const collectionTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data),
    [infiniteData],
  );

  if (viewType === "list") {
    return <CollectionItemsDataListView collectionTokens={collectionTokens} />;
  }

  return (
    <CollectionItemsDataGridView
      collectionTokens={collectionTokens}
      viewType={viewType}
    />
  );
}
