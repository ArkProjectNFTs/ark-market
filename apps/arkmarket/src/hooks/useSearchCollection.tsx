import { useQuery, keepPreviousData } from "@tanstack/react-query";

import getCollectionSearch from "~/lib/getCollectionSearch"

interface useSearchCollectionProps {
  inputDebouncedValue: string;
}

export default function useSearchCollection({ inputDebouncedValue }: useSearchCollectionProps) {
  const result = useQuery({
    queryKey: ["searchCollection", inputDebouncedValue],
    refetchInterval: false,
    placeholderData: keepPreviousData,
    queryFn: () => getCollectionSearch({ searchQuery: inputDebouncedValue }),
    enabled: inputDebouncedValue.length >= 3,
  });

  return result;
}
