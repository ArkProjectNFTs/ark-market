import { useAccount, useContractRead } from "@starknet-react/core";
import { formatEther } from "viem";

interface UseBalanceProps {
  token: string;
}

export default function useBalance({ token }: UseBalanceProps) {
  const { address } = useAccount();
  const { data, isError, isLoading, error } = useContractRead({
    functionName: "balance_of",
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    args: [address as string],
    abi: [
      {
        name: "balance_of",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
    ],
    address: token,
    watch: true,
    enabled: !!address,
    refetchInterval: 5_000,
  });

  const formatted = data ? formatEther(data as bigint) : undefined;

  return {
    data: {
      value: data as bigint,
      formatted,
      rounded: formatted ? parseFloat(formatted).toFixed(4) : undefined,
    },
    isError,
    isLoading,
    error,
  };
}
