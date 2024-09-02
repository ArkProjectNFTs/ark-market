"use client";

import * as React from "react";
import { useFulfillAuction, useFulfillOffer } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { LoaderCircle, Tag } from "@ark-market/ui/icons";
import { formatEther } from "viem";

import { areAddressesEqual, cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Separator } from "@ark-market/ui/separator";

import type { Token, TokenMarketData } from "~/types";
import { env } from "~/env";

interface TokenActionsAcceptBestOfferProps {
  token: Token;
  tokenMarketData: TokenMarketData | undefined;
  isAuction: boolean;
  small?: boolean;
}

export default function TokenActionsAcceptBestOffer({
  token,
  tokenMarketData,
  isAuction,
  small,
}: TokenActionsAcceptBestOfferProps) {
  const { address, account } = useAccount();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();
  const { fulfillOffer, status } = useFulfillOffer();
  const isOwner = areAddressesEqual(tokenMarketData?.owner, address);

  if (!account || !isOwner || !tokenMarketData?.has_offer) {
    return null;
  }

  const handleClick = async () => {
    try {
      if (isAuction) {
        await fulfillAuction({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
          tokenId: token.token_id,
          orderHash: tokenMarketData.top_offer.order_hash,
          relatedOrderHash: tokenMarketData.listing.order_hash,
        });
      } else {
        await fulfillOffer({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
          tokenId: token.token_id,
          orderHash: tokenMarketData.top_offer.order_hash,
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
      className={cn(small ?? "relative w-full lg:max-w-[50%]")}
      size={small ? "xl" : "xxl"}
    >
      {isLoading ? (
        <LoaderCircle
          className={cn("animate-spin", small ?? "absolute left-4")}
          size={small ? 20 : 24}
        />
      ) : (
        <Tag
          className={cn(small ?? "absolute left-4")}
          size={small ? 20 : 24}
        />
      )}
      Accept offer
      <Separator
        orientation="vertical"
        className={cn("h-5", small ? "mx-1" : "mx-2")}
      />
      {formatEther(BigInt(tokenMarketData.top_offer.amount))} ETH
    </Button>
  );
}
