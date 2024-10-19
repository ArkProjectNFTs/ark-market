import { useSuspenseQuery } from "@tanstack/react-query";

import getCollectionTraits from "~/lib/getCollectionTraits";

interface useCollectionTraitsSuspenseProps {
  collectionAddress: string;
  
}

export default function useCollectionTraitsSuspense({ collectionAddress }: useCollectionTraitsSuspenseProps) {
  const result = useSuspenseQuery({
    queryKey: ["collectionTraits", collectionAddress],
    queryFn: () => getCollectionTraits({ collectionAddress }),
  });
  return result;
}
