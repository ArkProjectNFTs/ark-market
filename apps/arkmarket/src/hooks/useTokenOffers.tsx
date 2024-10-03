import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import type { Token } from "~/types";
import type { TokenOffersApiResponse } from "~/lib/getTokenOffers";

import { getTokenOffers } from "~/lib/getTokenOffers";

interface useTokenOffersProps {
  token: Token,
}

const REFETCH_INTERVAL = 10_000;

export default function useTokenOffers({ token }: useTokenOffersProps) {

  const result = useInfiniteQuery({
    queryKey: ["tokenOffers", token.collection_address, token.token_id],
    refetchInterval: REFETCH_INTERVAL,
    getNextPageParam: (lastPage: TokenOffersApiResponse) => lastPage.next_page,
    placeholderData: keepPreviousData,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getTokenOffers({
        contractAddress: token.collection_address,
        tokenId: token.token_id,
        page: pageParam,
      }),
  });

  return result;
}
