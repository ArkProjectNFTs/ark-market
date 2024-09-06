import { useQuery } from "@tanstack/react-query";

import getCollection from "~/lib/getCollection";

interface UseCollectionProps {
  address: string;
}

const REFETCH_INTERVAL = 5_000;

export default function useCollection({ address }: UseCollectionProps) {
  const result = useQuery({
    queryKey: ["collection", address],
    queryFn: () =>
      getCollection({
        collectionAddress: address,
      }),
    refetchInterval: REFETCH_INTERVAL,
  });

  return result;
}
