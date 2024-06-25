"use client";

import * as React from "react";
import {
  useFulfillAuction,
  useFulfillOffer,
  useOrderType,
} from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { Offer, Token, TokenMarketData } from "~/types";
import { env } from "~/env";

interface AcceptOfferProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  offer: Offer;
}

const AcceptOffer: React.FC<AcceptOfferProps> = ({
  token,
  tokenMarketData,
  offer,
}) => {
  const { address, account } = useAccount();
  const { fulfillOffer, status } = useFulfillOffer();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();
  const type = useOrderType({
    orderHash: BigInt(tokenMarketData.order_hash),
  });
  const isAuction = type === "AUCTION";
  const isOwner = areAddressesEqual(token.owner, address);
  const isListed = tokenMarketData.is_listed;

  if (!account || !isOwner) {
    return null;
  }

  const handleClick = async () => {
    if (isListed && isAuction) {
      await fulfillAuction({
        starknetAccount: account,
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        tokenAddress: token.contract_address,
        tokenId: token.token_id,
        orderHash: tokenMarketData.order_hash,
        relatedOrderHash: offer.order_hash,
        startAmount: offer.offer_amount,
      });
    } else {
      await fulfillOffer({
        starknetAccount: account,
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        tokenAddress: token.contract_address,
        tokenId: token.token_id,
        orderHash: offer.order_hash,
      });
    }
  };

  const isLoading = status === "loading" || statusAuction === "loading";

  return (
    <Button onClick={handleClick} disabled={isLoading} size="sm">
      {isLoading ? <ReloadIcon className="animate-spin" /> : "Accept"}
    </Button>
  );
};

export default AcceptOffer;
