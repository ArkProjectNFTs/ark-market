import { useQuery } from "@tanstack/react-query";

import getPortfolioStats from "~/lib/getPortfolioStats";

interface UsePortfolioStatsProps {
  address: string;
}

const REFETCH_INTERVAL = 5_000;

export default function usePortfolioStats({ address }: UsePortfolioStatsProps) {
  const result = useQuery({
    queryKey: ["portfolioStats", address],
    queryFn: () => getPortfolioStats({ address }),
    refetchInterval: REFETCH_INTERVAL,
    initialData: {
      total_value: null,
    },
    enabled: !!address,
  });

  return result;
}
