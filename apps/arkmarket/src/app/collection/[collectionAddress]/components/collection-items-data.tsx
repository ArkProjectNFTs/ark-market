"use client";

import { useMemo } from "react";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "~/lib/getCollectionTokens";
import type { CollectionToken, Filters } from "~/types";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import CollectionItemsDataGridView from "./collection-items-data-grid-view";
import CollectionItemsDataListView from "./collection-items-data-list-view";
import useCollectionTokens from "~/hooks/useCollectionTokens";

interface CollectionItemsDataProps {
  collectionAddress: string;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  viewType: ViewType;
  filters: Filters;
  buyNow: boolean;
}

export default function CollectionItemsData({
  collectionAddress,
  sortBy,
  sortDirection,
  viewType,
  filters,
  buyNow,
}: CollectionItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCollectionTokens({ collectionAddress, filters, sortBy, sortDirection, buyNow })

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  });

  const collectionTokens: CollectionToken[] = useMemo(
    () => infiniteData.pages.flatMap((page) => page.data),
    [infiniteData],
  );

  return viewType === "list" ? (
    <CollectionItemsDataListView collectionTokens={collectionTokens} />
  ) : (
    <CollectionItemsDataGridView
      collectionTokens={collectionTokens}
      viewType={viewType}
    />
  );
}
