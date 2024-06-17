"use client";

import React from "react";
import { useFulfillOffer } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import { areAddressesEqual } from "@ark-market/ui/lib/utils";

import type { Offer, Token } from "~/types/schema";
import { env } from "~/env";

interface AcceptOfferProps {
  token: Token;
  offer: Offer;
}

const AcceptOffer: React.FC<AcceptOfferProps> = ({ token, offer }) => {
  const { address, account } = useAccount();
  const { fulfillOffer, status } = useFulfillOffer();
  const isOwner = areAddressesEqual(token.owner, address);

  if (!account || !isOwner) {
    return null;
  }

  const handleClick = async () => {
    await fulfillOffer({
      starknetAccount: account,
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      tokenAddress: token.contract_address,
      tokenId: token.token_id,
      orderHash: offer.order_hash,
    });
  };

  const isLoading = status === "loading";

  return (
    <Button onClick={handleClick} disabled={isLoading} size="sm">
      {isLoading ? <ReloadIcon className="animate-spin" /> : "Accept"}
    </Button>
  );
};

export default AcceptOffer;
