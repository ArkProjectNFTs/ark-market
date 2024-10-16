"use client";

import { useState } from "react";

import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionStats,
  CollectionTimerange,
} from "~/types";
import useCollections from "~/hooks/useCollections";
import CollectionList from "./collections-list";
import CollectionsToolbar from "./collections-toolbar";

interface CollectionsContainerProps {
  initialData: CollectionStats[];
}

export default function CollectionsContainer({
  initialData,
}: CollectionsContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    timerange,
    setTimerange,
  } = useCollections({ initialData });

  const onSortChange = async (
    by: CollectionSortBy,
    direction: CollectionSortDirection,
  ) => {
    await setSortBy(by);
    await setSortDirection(direction);
  };

  const handleTimerangeChange = async (timerange: CollectionTimerange) => {
    await setTimerange(timerange);
  };

  const items = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <CollectionsToolbar
        timerange={timerange}
        onTimerangeChange={handleTimerangeChange}
        onSearchChange={(query) => setSearchQuery(query)}
      />
      <CollectionList
        items={items}
        onSortChange={onSortChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </>
  );
}
