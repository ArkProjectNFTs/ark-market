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

import { env } from "~/env";

interface AcceptOfferProps {
  offerOrderHash: string;
  offerAmount: string;

  tokenOwner: string;
  tokenContractAddress: string;
  tokenId: string;
  tokenIsListed: boolean;
  tokenListingOrderHash: string;
}

const AcceptOffer: React.FC<AcceptOfferProps> = ({
  offerAmount,
  offerOrderHash,
  tokenIsListed,
  tokenListingOrderHash,
  tokenContractAddress,
  tokenId,
  tokenOwner,
}) => {
  const { address, account } = useAccount();
  const { fulfillOffer, status } = useFulfillOffer();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();
  const type = useOrderType({
    orderHash: BigInt(tokenListingOrderHash),
  });
  const isAuction = type === "AUCTION";
  const isOwner = areAddressesEqual(tokenOwner, address);
  const isListed = tokenIsListed;

  if (!account || !isOwner) {
    return null;
  }

  const handleClick = async () => {
    if (isListed && isAuction) {
      await fulfillAuction({
        starknetAccount: account,
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        tokenAddress: tokenContractAddress,
        tokenId,
        orderHash: tokenListingOrderHash,
        relatedOrderHash: offerOrderHash,
        startAmount: offerAmount,
      });
    } else {
      await fulfillOffer({
        starknetAccount: account,
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        tokenAddress: tokenContractAddress,
        tokenId,
        orderHash: offerOrderHash,
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
