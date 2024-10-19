import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import type { ActivityType } from "~/types";
import type { CollectionActivityApiResponse } from "~/lib/getCollectionActivity";

import { getCollectionActivity } from "~/lib/getCollectionActivity";

interface useCollectionActivityProps {
  collectionAddress: string;
  filters: ActivityType[];
}

export default function useCollectionActivity({ collectionAddress, filters }: useCollectionActivityProps) {

  const result = useInfiniteQuery({
    queryKey: ["collectionActivity", collectionAddress, ...filters],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: CollectionActivityApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getCollectionActivity({
        page: pageParam,
        collectionAddress,
        activityFilters: filters,
      }),
  });

  return result;
}
