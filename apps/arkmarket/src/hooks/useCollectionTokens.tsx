import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionTokensApiResponse,
} from "~/lib/getCollectionTokens";
import type { ViewType } from "~/components/view-type-toggle-group";
import type { Filters } from "~/types";

import { getCollectionTokens } from "~/lib/getCollectionTokens";

interface useCollectionTokensProps {
  collectionAddress: string;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  viewType: ViewType;
  filters: Filters;
}

const REFETCH_INTERVAL = 10_000;

export default function useCollectionTokens({ collectionAddress, sortDirection, sortBy, filters }: useCollectionTokensProps) {
  const result = useSuspenseInfiniteQuery({
    queryKey: [
      "collectionTokens",
      sortDirection,
      sortBy,
      collectionAddress,
      filters,
    ],
    refetchInterval: REFETCH_INTERVAL,
    getNextPageParam: (lastPage: CollectionTokensApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
        filters,
      }),
  });
  return result;
}
