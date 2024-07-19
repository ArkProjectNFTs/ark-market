"use client";

import { useCancel } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { ListX, LoaderCircle } from "lucide-react";

import { areAddressesEqual, cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { Token, TokenMarketData } from "~/types";

interface TokenActionsCancelListingProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  small?: boolean;
}

export default function TokenActionsCancelListing({
  token,
  tokenMarketData,
  small,
}: TokenActionsCancelListingProps) {
  const { account, address } = useAccount();
  const { cancel, status } = useCancel();
  const isOwner = areAddressesEqual(tokenMarketData.owner, address);

  if (!account || !isOwner || !tokenMarketData.is_listed) {
    return;
  }

  const handleClick = async () => {
    await cancel({
      starknetAccount: account,
      orderHash: BigInt(tokenMarketData.listing.order_hash),
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={status === "loading"}
      className={cn(small ?? "relative w-full lg:max-w-[50%]")}
      size={small ? "xl" : "xxl"}
      variant="secondary"
    >
      {status === "loading" ? (
        <LoaderCircle
          className={cn("animate-spin", small ?? "absolute left-4")}
          size={small ? 20 : 24}
        />
      ) : (
        <ListX
          size={small ? 20 : 24}
          className={cn(small ?? "absolute left-4")}
        />
      )}
      Cancel listing
    </Button>
  );
}
