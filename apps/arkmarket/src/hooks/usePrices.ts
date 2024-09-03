import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";

import getPrices from "~/lib/getPrices";

interface ConvertInUsdParams {
  token?: "ethereum" | "starknet";
  amount?: bigint;
}

export default function usePrices() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
    refetchInterval: 15_000,
    staleTime: 15_000,
  });

  const convertInUsd = ({
    token = "ethereum",
    amount = BigInt(0),
  }: ConvertInUsdParams) => {
    if (!data) {
      return 0;
    }

    const amountInEther = parseFloat(formatEther(amount));
    const price = data[token].price;
    const amountInUsd = amountInEther * price;

    return amountInUsd.toLocaleString("en-us", {
      notation: "compact",
      minimumFractionDigits: 2,
    });
  };

  return {
    data: {
      ethereum: data?.ethereum.price,
      ethereumFormatted: data?.ethereum.price.toFixed(2),
      starknet: data?.starknet.price,
      starknetFormatted: data?.starknet.price.toFixed(2),
    },
    isLoading,
    isError,
    error,
    convertInUsd,
  };
}
