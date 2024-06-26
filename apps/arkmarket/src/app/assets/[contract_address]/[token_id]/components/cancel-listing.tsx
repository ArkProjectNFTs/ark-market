"use client";

import * as React from "react";
import { useCancel } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { Token, TokenMarketData } from "~/types";

interface CancelListingProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

const CancelListing: React.FC<CancelListingProps> = ({
  token,
  tokenMarketData,
}) => {
  const { account, address } = useAccount();
  const { cancel, status } = useCancel();
  const isOwner = areAddressesEqual(token.owner, address);

  if (!account || !isOwner || !tokenMarketData.is_listed) {
    return;
  }

  const handleClick = async () => {
    await cancel({
      starknetAccount: account,
      orderHash: BigInt(tokenMarketData.order_hash),
      tokenAddress: token.contract_address,
      tokenId: BigInt(token.token_id),
    });
  };

  const isDisabled = ["loading", "cancelling"].includes(status);

  return (
    <Button onClick={handleClick} disabled={isDisabled} size="xl">
      {status === "loading" ? (
        <ReloadIcon className="animate-spin" />
      ) : (
        "Cancel listing"
      )}
    </Button>
  );
};

export default CancelListing;
