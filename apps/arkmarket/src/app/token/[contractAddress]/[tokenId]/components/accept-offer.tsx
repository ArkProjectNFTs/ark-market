"use client";

import * as React from "react";
import { useFulfillAuction, useFulfillOffer } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";

import { Button } from "@ark-market/ui/button";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import { env } from "~/env";

interface AcceptOfferProps {
  offer: TokenOffer;
  token: Token;
  tokenMarketData: TokenMarketData;
}

const AcceptOffer: React.FC<AcceptOfferProps> = ({
  offer,
  token,
  tokenMarketData,
}) => {
  const { account } = useAccount();
  const { fulfillOffer, status } = useFulfillOffer();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();

  const handleClick = async () => {
    if (tokenMarketData.is_listed && tokenMarketData.listing.is_auction) {
      await fulfillAuction({
        starknetAccount: account,
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        tokenAddress: token.collection_address,
        tokenId: token.token_id,
        orderHash: tokenMarketData.listing.order_hash,
        relatedOrderHash: offer.hash,
        startAmount: offer.price,
      });
    } else {
      await fulfillOffer({
        starknetAccount: account,
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        tokenAddress: token.collection_address,
        tokenId: token.token_id,
        orderHash: offer.hash,
      });
    }
  };

  const isLoading = status === "loading" || statusAuction === "loading";

  return (
    <Button onClick={handleClick} disabled={isLoading} size="md">
      {isLoading ? <ReloadIcon className="animate-spin" /> : "Accept"}
    </Button>
  );
};

export default AcceptOffer;
