"use client";

import { useCancel } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { ListX, LoaderCircle } from "lucide-react";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { Collection, Token, TokenMarketData } from "~/types";

interface TokenActionsCancelListingProps {
  collection: Collection;
  token: Token;
  tokenId: string;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsCancelListing({
  collection,
  token,
  tokenId,
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
      orderHash: BigInt(tokenMarketData.listing.order_hash),
      tokenAddress: collection.contract_address,
      tokenId: BigInt(tokenId),
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={status === "loading"}
      className="relative w-full lg:max-w-[50%]"
      size="xxl"
      variant="secondary"
    >
      {status === "loading" ? (
        <LoaderCircle className="absolute left-4 h-6 w-6 animate-spin" />
      ) : (
        <ListX size={24} className="absolute left-4" />
      )}
      Cancel listing
    </Button>
  );
}
