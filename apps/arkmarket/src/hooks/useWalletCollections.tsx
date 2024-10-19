import { useInfiniteQuery } from "@tanstack/react-query";

import type { WalletCollectionsApiResponse } from "~/app/wallet/[walletAddress]/queries/getWalletData";

import { getWalletCollections } from "~/app/wallet/[walletAddress]/queries/getWalletData";

interface useWalletCollectionsProps {
  walletAddress: string;
}

const REFETCH_INTERVAL = 10_000;

export default function useWalletCollections({ walletAddress }: useWalletCollectionsProps) {

  const result = useInfiniteQuery({
    queryKey: ["walletCollections", walletAddress],
    refetchInterval: REFETCH_INTERVAL,
    getNextPageParam: (lastPage: WalletCollectionsApiResponse) =>
      lastPage.next_page,
    // initialData: {
    //   pages: [walletCollectionsInitialData],
    //   pageParams: [],
    // },
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletCollections({
        page: pageParam,
        walletAddress,
      }),
  });

  return result;
}
