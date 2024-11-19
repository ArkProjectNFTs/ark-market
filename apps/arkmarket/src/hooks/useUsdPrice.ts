import { fetchQuotes } from "@avnu/avnu-sdk";
import { useQuery } from "@tanstack/react-query";

import type { Currency } from "~/types";
import { USDC } from "~/constants/tokens";

interface UseUsdPriceParameters {
  amount: bigint;
  currency: Currency;
}

export default function useUsdPrice({
  amount,
  currency,
}: UseUsdPriceParameters) {
  const { data } = useQuery({
    queryKey: ["usdPrice", amount.toString(), currency.contract],
    queryFn: async () => {
      const [quote] = await fetchQuotes({
        sellTokenAddress: currency.contract,
        buyTokenAddress: USDC,
        sellAmount: amount,
      });

      const amountInUsd = quote?.sellAmountInUsd ?? 0;

      return amountInUsd.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    },
    refetchInterval: 30000,
    structuralSharing: false,
  });

  return data ?? "0";
}
