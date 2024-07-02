"use client";

import * as React from "react";
import { useFulfillListing } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { SiEthereum } from "react-icons/si";
import { formatEther } from "viem";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Separator } from "@ark-market/ui/separator";

import type { Token, TokenMarketData } from "~/types";
import { env } from "~/env";

interface BuyOrderProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

const BuyNow: React.FC<BuyOrderProps> = ({ token, tokenMarketData }) => {
  const { fulfillListing, status } = useFulfillListing();
  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(token.owner, address);

  if (
    !account ||
    isOwner ||
    !tokenMarketData.is_listed ||
    tokenMarketData.status === "FULFILLED"
  ) {
    return null;
  }

  return (
    <Button
      size="xl"
      disabled={status === "loading"}
      onClick={() =>
        fulfillListing({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.contract_address,
          tokenId: token.token_id,
          orderHash: tokenMarketData.order_hash,
          startAmount: tokenMarketData.start_amount,
        })
      }
    >
      <div className="flex w-full justify-between">
        <div className="font-bold uppercase">
          {status === "loading" ? "Loading..." : "Buy now"}
        </div>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center space-x-1">
          <div>{formatEther(BigInt(tokenMarketData.start_amount))}</div>
          <SiEthereum />
        </div>
      </div>
    </Button>
  );
};

export default BuyNow;
