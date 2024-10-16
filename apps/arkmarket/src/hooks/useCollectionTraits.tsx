import { useQuery } from "@tanstack/react-query";

import getCollectionTraits from "~/lib/getCollectionTraits"

interface useCollectionTraitsProps {
  address: string;
}

export default function useCollectionTraits({ address }: useCollectionTraitsProps) {
  const result = useQuery({
    queryKey: ["collectionTraits", address],
    queryFn: () => 
      getCollectionTraits({ 
        collectionAddress:address 
      }),
  });

  return result;
}
