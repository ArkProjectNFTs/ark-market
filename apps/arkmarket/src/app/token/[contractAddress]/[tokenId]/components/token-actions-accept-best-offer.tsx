"use client";

import * as React from "react";
import { useFulfillAuction, useFulfillOffer } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { Tag } from "lucide-react";
import { formatEther } from "viem";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Separator } from "@ark-market/ui/separator";

import type { Token, TokenMarketData } from "~/types";
import { env } from "~/env";

interface TokenActionsAcceptBestOfferProps {
  token: Token;
  tokenMarketData: TokenMarketData | undefined;
  isAuction: boolean;
}

export default function TokenActionsAcceptBestOffer({
  token,
  tokenMarketData,
  isAuction,
}: TokenActionsAcceptBestOfferProps) {
  const { address, account } = useAccount();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();
  const { fulfillOffer, status } = useFulfillOffer();
  const isOwner = areAddressesEqual(token.owner, address);

  if (!account || !isOwner || !tokenMarketData?.has_offer) {
    return null;
  }

  const handleClick = async () => {
    try {
      if (isAuction) {
        await fulfillAuction({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.contract_address,
          tokenId: token.token_id,
          orderHash: tokenMarketData.top_bid.order_hash,
          relatedOrderHash: tokenMarketData.order_hash,
        });
      } else {
        await fulfillOffer({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.contract_address,
          tokenId: token.token_id,
          orderHash: tokenMarketData.top_bid.order_hash,
        });
      }
    } catch (error) {
      console.log("Error accepting offer", error);
    }
  };

  const isLoading = status === "loading" || statusAuction === "loading";

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className="relative w-full lg:max-w-[50%]"
      size="xxl"
    >
      {isLoading ? (
        <ReloadIcon className="absolute left-4 size-6 animate-spin" />
      ) : (
        <Tag size={24} className="absolute left-4" />
      )}
      Accept offer
      <Separator orientation="vertical" className="h-5" />
      {formatEther(BigInt(tokenMarketData.top_bid.amount))} ETH
    </Button>
  );
}
