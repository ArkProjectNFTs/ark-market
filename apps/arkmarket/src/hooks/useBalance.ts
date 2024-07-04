import { useAccount, useContractRead } from "@starknet-react/core";
import { formatEther } from "viem";

export default function useBalance() {
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
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    watch: true,
    enabled: !!address,
  });

  return {
    data: {
      value: data as bigint,
      formatted: data ? formatEther(data as bigint) : undefined,
    },
    isError,
    isLoading,
    error,
  };
}
