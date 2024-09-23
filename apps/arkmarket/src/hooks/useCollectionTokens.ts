import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionTokensApiResponse,
} from "~/lib/getCollectionTokens";
import type { Filters } from "~/types";
import { getCollectionTokens } from "~/lib/getCollectionTokens";

interface UseCollectionTokensParams {
  collectionAddress: string;
  sortDirection: CollectionSortDirection;
  sortBy: CollectionSortBy;
  filters: Filters;
}

export default function useCollectionTokens({
  collectionAddress,
  sortDirection,
  sortBy,
  filters,
}: UseCollectionTokensParams) {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      refetchInterval: 10_000,
      initialPageParam: undefined,
      queryKey: [
        "collectionTokens",
        collectionAddress,
        sortDirection,
        sortBy,
        filters,
      ],
      queryFn: ({ pageParam }) =>
        getCollectionTokens({
          collectionAddress,
          page: pageParam,
          sortDirection,
          sortBy,
          filters,
        }),
      getNextPageParam: (lastPage: CollectionTokensApiResponse) =>
        lastPage.next_page,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
