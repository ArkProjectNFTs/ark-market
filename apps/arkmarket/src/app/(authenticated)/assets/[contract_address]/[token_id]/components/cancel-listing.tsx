"use client";

import React from "react";
import { useCancel } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import { areAddressesEqual } from "@ark-market/ui/lib/utils";

interface CreateOfferProps {
  token: any;
  tokenMarketData: any;
}

const CancelListing: React.FC<CreateOfferProps> = ({
  token,
  tokenMarketData,
}) => {
  const { cancel, status } = useCancel();
  const { account, address } = useAccount();
  const isOwner = address && areAddressesEqual(token.owner, address);
  if (account === undefined || !isOwner || !tokenMarketData?.is_listed) return;
  return (
    <div className="flex w-full flex-col space-y-4 rounded border p-4">
      <h1>Cancel listing</h1>
      <Button
        onClick={() => {
          cancel({
            starknetAccount: account,
            orderHash: tokenMarketData.order_hash,
            tokenAddress: token.contract_address,
            tokenId: token.token_id,
          });
        }}
      >
        Cancel listing
      </Button>
      {status === "loading" && "Cancelling..."}
      {status === "success" && "Cancelled"}
    </div>
  );
};

export default CancelListing;
