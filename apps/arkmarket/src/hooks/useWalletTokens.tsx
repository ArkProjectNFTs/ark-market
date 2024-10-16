import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import type { WalletTokensApiResponse } from "~/app/wallet/[walletAddress]/queries/getWalletData";

import { getWalletTokens } from "~/app/wallet/[walletAddress]/queries/getWalletData";


interface useWalletTokensProps {
  walletAddress: string;
  collectionFilter: string | null,
  
}

const REFETCH_INTERVAL = 10_000;

export default function useWalletTokens({ walletAddress, collectionFilter }: useWalletTokensProps) {

  const result = useInfiniteQuery({
    queryKey: ["walletTokens", collectionFilter, walletAddress],
    refetchInterval: REFETCH_INTERVAL,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: WalletTokensApiResponse) => lastPage.next_page,
    // initialData: isSSR
    //   ? {
    //       pages: [walletTokensInitialData],
    //       pageParams: [],
    //     }
    //   : undefined,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletTokens({
        page: pageParam,
        walletAddress,
        collectionAddress: collectionFilter,
      }),
  });

  return result;
}
