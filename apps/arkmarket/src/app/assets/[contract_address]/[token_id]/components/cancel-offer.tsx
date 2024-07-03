"use client";

import React, { useEffect } from "react";
import { useCancel } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";

import { Button } from "@ark-market/ui/button";
import { toast } from "@ark-market/ui/toast";

interface CancelOfferProps {
  tokenContractAddress: string;
  tokenId: string;
  offerOrderHash: string;
}

const CancelOffer = ({
  offerOrderHash,
  tokenContractAddress,
  tokenId,
}: CancelOfferProps) => {
  const { account } = useAccount();
  const { cancel, status } = useCancel();

  useEffect(() => {
    if (status === "error") {
      toast("An error occurred while cancelling the offer");
    }
  }, [status]);

  const handleClick = async () => {
    if (!account) {
      return;
    }

    await cancel({
      starknetAccount: account,
      tokenAddress: tokenContractAddress,
      tokenId: BigInt(tokenId),
      orderHash: BigInt(offerOrderHash),
    });
  };

  if (!account || status === "success") {
    return;
  }

  const isLoading = ["loading", "cancelling"].includes(status);

  return (
    <Button size="xl" onClick={handleClick} disabled={isLoading}>
      {status === "loading" ? (
        <ReloadIcon className="animate-spin" />
      ) : (
        "Cancel"
      )}
    </Button>
  );
};

export default CancelOffer;
