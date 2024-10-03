import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import type { ActivityType } from "~/types";
import type { PortfolioActivityApiResponse } from "~/lib/getPortfolioActivity";

import { getPortfolioActivity } from "~/lib/getPortfolioActivity";

interface useWalletActivityProps {
  walletAddress: string;
  activityFilters: ActivityType[];
}

const REFETCH_INTERVAL = 10_000;

export default function useWalletActivity({ walletAddress, activityFilters }: useWalletActivityProps) {

  const result = useInfiniteQuery({
    queryKey: ["walletActivity", walletAddress, ...activityFilters],
    refetchInterval: REFETCH_INTERVAL,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: PortfolioActivityApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPortfolioActivity({
        page: pageParam,
        walletAddress,
        activityFilters,
      }),
  });

  return result;
}
