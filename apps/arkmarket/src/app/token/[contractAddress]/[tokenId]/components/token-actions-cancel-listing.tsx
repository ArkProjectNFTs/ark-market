"use client";

import { useCancel } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { ListX } from "lucide-react";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { Token, TokenMarketData } from "~/types";

interface TokenActionsCancelListingProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsCancelListing({
  token,
  tokenMarketData,
}: TokenActionsCancelListingProps) {
  const { account, address } = useAccount();
  const { cancel, status } = useCancel();
  const isOwner = areAddressesEqual(token.owner, address);

  if (!account || !isOwner || !tokenMarketData.is_listed) {
    return;
  }

  const handleClick = async () => {
    await cancel({
      starknetAccount: account,
      orderHash: BigInt(tokenMarketData.order_hash),
      tokenAddress: token.contract_address,
      tokenId: BigInt(token.token_id),
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={status === "loading"}
      className="relative w-full lg:max-w-[50%]"
      size="xl"
      variant="secondary"
    >
      {status === "loading" ? (
        <ReloadIcon className="absolute left-4 h-6 w-6 animate-spin" />
      ) : (
        <ListX size={24} className="absolute left-4" />
      )}
      Cancel listing
    </Button>
  );
}
