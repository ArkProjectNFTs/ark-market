"use client";

import React, { useEffect } from "react";
import { useCancel } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";

import { Button } from "@ark-market/ui/components/button";
import { toast } from "@ark-market/ui/components/toast";

import type { Offer, Token } from "~/types/schema";

interface CancelOfferProps {
  token: Token;
  offer: Offer;
}

const CancelOffer: React.FC<CancelOfferProps> = ({ token, offer }) => {
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
      tokenAddress: token.contract_address,
      tokenId: BigInt(token.token_id),
      orderHash: BigInt(offer.order_hash),
    });
  };

  if (!account || status === "success") {
    return;
  }

  const isLoading = ["loading", "cancelling"].includes(status);

  return (
    <Button size="sm" onClick={handleClick} disabled={isLoading}>
      {status === "loading" ? (
        <ReloadIcon className="animate-spin" />
      ) : (
        "Cancel"
      )}
    </Button>
  );
};

export default CancelOffer;
