import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import type {
  PortfolioOffersApiResponse,
  PortfolioOffersTypeValues,
} from "~/lib/getPortfolioOffers";

import { getPortfolioOffers } from "~/lib/getPortfolioOffers";

interface useWalletOffersProps {
  walletAddress: string;
  offerType: PortfolioOffersTypeValues;
}

const REFETCH_INTERVAL = 10_000;

export default function useWalletOffers({ walletAddress, offerType }: useWalletOffersProps) {

  const result = useInfiniteQuery({
    queryKey: ["walletOffers", walletAddress, offerType],
    refetchInterval: REFETCH_INTERVAL,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: PortfolioOffersApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPortfolioOffers({
        page: pageParam,
        walletAddress,
        offerType,
      }),
  });

  return result;
}
