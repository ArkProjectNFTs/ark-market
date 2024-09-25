import { useQuery } from "@tanstack/react-query";

import type { TokenMarketData } from "~/types";
import getTokenMarketData from "~/lib/getTokenMarketData";

interface UseTokenMarketdataProps {
  collectionAddress: string;
  tokenId: string;
  initialData?: TokenMarketData;
}

const REFETCH_INTERVAL = 5_000;

export default function useTokenMarketdata({
  collectionAddress,
  tokenId,
  initialData,
}: UseTokenMarketdataProps) {
  const result = useQuery({
    queryKey: ["tokenMarketData", collectionAddress, tokenId],
    queryFn: () =>
      getTokenMarketData({
        contractAddress: collectionAddress,
        tokenId,
      }),
    refetchInterval: REFETCH_INTERVAL,
    initialData,
  });

  return result;
}
