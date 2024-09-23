"use client";

import { useEffect, useMemo } from "react";

import type { ViewType } from "~/components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "~/lib/getCollectionTokens";
import type { CollectionToken, Filters } from "~/types";
import useCollectionTokens from "~/hooks/useCollectionTokens";
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCollectionTokens({
      collectionAddress,
      sortDirection,
      sortBy,
      filters,
    });

  const items: CollectionToken[] = useMemo(
    () =>
      data.pages
        .flatMap((page) => page.data)
        .filter((token) => token.token_id.includes(searchQuery)),
    [data.pages, searchQuery],
  );

  console.log("isFetchingNextPage", isFetchingNextPage);

  useEffect(() => {
    if (items.length > 0 || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const run = async () => {
      console.log("fetchNextPage 1");
      await fetchNextPage();
    };

    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleEndReached = async () => {
    if (isFetchingNextPage || !hasNextPage) {
      return;
    }

    console.log("fetchNextPage 2");
    await fetchNextPage();
  };

  if (items.length === 0) {
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
    <CollectionItemsDataListView collectionTokens={items} />
  ) : (
    <CollectionItemsDataGridView
      items={items}
      onEndReached={handleEndReached}
      viewType={viewType}
    />
  );
}

export default CollectionItemsData;
