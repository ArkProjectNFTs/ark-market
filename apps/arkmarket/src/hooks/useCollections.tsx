"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionStats,
  CollectionTimerange,
} from "~/types";
import getCollections from "~/lib/getCollections";

const REFETCH_INTERVAL = 10_000;

interface UseCollectionsParams {
  initialData: CollectionStats[];
}

export default function useCollections({ initialData }: UseCollectionsParams) {
  const [sortBy, setSortBy] = useQueryState<CollectionSortBy>("sort", {
    defaultValue: "volume",
    parse: (value) => value as CollectionSortBy,
  });
  const [sortDirection, setSortDirection] =
    useQueryState<CollectionSortDirection>("dir", {
      defaultValue: "desc",
      parse: (value) => value as CollectionSortDirection,
    });
  const [timerange, setTimerange] = useQueryState<CollectionTimerange>(
    "timerange",
    {
      defaultValue: "1d",
      parse: (value) => value as CollectionTimerange,
    },
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: ["collections", { sortBy, sortDirection, timerange }],
    queryFn: async () =>
      getCollections({ sortBy, sortDirection, timerange, itemsPerPage: 100 }),
    refetchInterval: REFETCH_INTERVAL,
    structuralSharing: false,
    initialData,
  });

  return {
    data,
    isLoading,
    isError,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    timerange,
    setTimerange,
  };
}
