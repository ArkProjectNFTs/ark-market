"use client";

import React from "react";
import { useFulfillListing } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { SiEthereum } from "react-icons/si";
import { Web3 } from "web3";

import { Button } from "@ark-market/ui/components/button";
import { areAddressesEqual } from "@ark-market/ui/lib/utils";

import type { Token, TokenMarketData } from "~/types/schema";
import { env } from "~/env";

interface BuyOrderProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

const BuyOrder: React.FC<BuyOrderProps> = ({ token, tokenMarketData }) => {
  const { fulfillListing, status, stepStatus } = useFulfillListing();
  const { address, account } = useAccount();
  const isOwner = address && areAddressesEqual(token.owner, address);

  if (
    account === undefined ||
    isOwner ||
    !tokenMarketData?.is_listed ||
    tokenMarketData.status === "FULFILLED"
  )
    return null;

  return (
    <div className="flex w-full flex-col space-y-4 rounded border p-4">
      <h1>Buy token</h1>
      <Button
        onClick={() =>
          fulfillListing({
            starknetAccount: account,
            brokerId: env.NEXT_PUBLIC_BROKER_ID,
            tokenAddress: token.contract_address,
            tokenId: token.token_id,
            orderHash: tokenMarketData.order_hash,
            // TODO: add address from the api when it's available
            // currencyAddress: tokenMarketData.currency_address,
            startAmount: tokenMarketData.start_amount,
          })
        }
      >
        <div className="flex w-full justify-between">
          <div className="font-bold uppercase">
            {status === "idle" && "BUY NOW"}
            {status === "loading" && (
              <>
                {stepStatus === "idle" && "Creating transaction..."}
                {stepStatus === "approving" && "Approving..."}
                {stepStatus === "selling" && "Sell in progress..."}
              </>
            )}
            {status === "success" && "Bought"}
            {status === "error" && "Error"}
          </div>
          <div className="flex items-center space-x-1">
            {Web3.utils.fromWei(tokenMarketData.start_amount, "ether")}{" "}
            <SiEthereum />
          </div>
        </div>
      </Button>
    </div>
  );
};

export default BuyOrder;
