"use client";

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

  return (
    <div className="">
      <CollectionsToolbar
        timerange={timerange}
        onTimerangeChange={handleTimerangeChange}
      />
      <CollectionList
        items={data}
        onSortChange={onSortChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </div>
  );
}
