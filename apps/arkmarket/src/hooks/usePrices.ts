import { useQuery } from "react-query";
import { formatEther } from "viem";

import getPrices from "~/lib/getPrices";

interface ConvertInUsdParams {
  token?: "ethereum" | "starknet";
  amount: bigint | null;
}

export default function usePrices() {
  const { data, isLoading, isError, error } = useQuery("prices", getPrices, {
    refetchInterval: 15_000,
  });

  const convertInUsd = ({ token = "ethereum", amount }: ConvertInUsdParams) => {
    if (!data) {
      return 0;
    }

    const amountInEther = parseFloat(formatEther(amount ?? BigInt(0)));
    const price = data[token].price;

    return price ? amountInEther * price : 0;
  };

  return {
    data,
    isLoading,
    isError,
    error,
    convertInUsd,
  };
}
