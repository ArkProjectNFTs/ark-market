import { useContract } from "@starknet-react/core";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";

import { erc20Abi } from "~/constants/abis";

interface UseBalanceProps {
  address?: string;
  token: string;
}

export default function useBalance({ address, token }: UseBalanceProps) {
  const { contract } = useContract({
    abi: erc20Abi,
    address: token,
  });

  const { data, isError, isLoading, error, isPending } = useQuery({
    queryKey: ["balance", address, token],
    queryFn: async () => {
      if (!address) {
        throw new Error("address is required");
      }

      if (!contract) {
        throw new Error("contract is required");
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const balance = (await contract.balanceOf(address)) as bigint;
      const formatted = formatEther(balance);

      return {
        value: balance,
        formatted,
        rounded: parseFloat(formatEther(balance)).toFixed(4),
      };
    },
    enabled: !!address,
    refetchInterval: 15_000,
    structuralSharing: false,
  });

  return {
    data,
    isError,
    isLoading,
    isPending,
    error,
  };
}
