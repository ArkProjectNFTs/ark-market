"use client";

import React from "react";
import { useFulfillOffer } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { Button } from "@ark-market/ui/components/button";
import { Separator } from "@ark-market/ui/components/separator";
import { areAddressesEqual } from "@ark-market/ui/lib/utils";

import type { Token, TokenMarketData } from "~/types/schema";
import { env } from "~/env";

interface BuyOrderProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

const AcceptBestOffer: React.FC<BuyOrderProps> = ({
  token,
  tokenMarketData,
}) => {
  const { address, account } = useAccount();
  const { fulfillOffer, status } = useFulfillOffer();
  const isOwner = areAddressesEqual(token.owner, address);

  if (!account || !isOwner || !tokenMarketData?.has_offer) {
    return null;
  }

  console.log({
    brokerId: env.NEXT_PUBLIC_BROKER_ID,
    tokenAddress: token.contract_address,
    tokenId: token.token_id,
    orderHash: tokenMarketData.top_bid.order_hash,
  });

  const handleClick = async () => {
    try {
      await fulfillOffer({
        starknetAccount: account,
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        tokenAddress: token.contract_address,
        tokenId: token.token_id,
        orderHash: tokenMarketData.top_bid.order_hash,
      });
    } catch (error) {
      console.log("Error accepting offer");
    }
  };

  const isLoading = status === "loading";

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className="max-w-[320px]"
    >
      {isLoading ? (
        <ReloadIcon className="animate-spin" />
      ) : (
        <>
          Accept offer
          <Separator orientation="vertical" className="mx-4" />
          {formatEther(BigInt(tokenMarketData?.top_bid?.amount))} ETH
        </>
      )}
    </Button>
  );
};

export default AcceptBestOffer;
