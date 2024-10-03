import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import type { TokenActivityApiResponse } from "~/lib/getTokenActivity";

import getTokenActivity from "~/lib/getTokenActivity";

interface useTokenActivityProps {
  contractAddress: string;
  tokenId: string;
}

const REFETCH_INTERVAL = 10_000;

export default function useTokenActivity({ contractAddress, tokenId }: useTokenActivityProps) {

  const result = useInfiniteQuery({
    queryKey: ["tokenActivity", contractAddress, tokenId],
    refetchInterval: REFETCH_INTERVAL,
    // getNextPageParam: (lastPage) => lastPage.next_page,
    getNextPageParam: (lastPage?: TokenActivityApiResponse) =>
      lastPage?.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getTokenActivity({ contractAddress, tokenId, page: pageParam }),
  });

  return result;
}
