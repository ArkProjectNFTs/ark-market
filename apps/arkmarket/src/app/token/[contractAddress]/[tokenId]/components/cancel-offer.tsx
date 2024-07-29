"use client";

import React, { useEffect } from "react";
import { useCancel } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { Button } from "@ark-market/ui/button";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenOffer } from "~/types";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

interface CancelOfferProps {
  token: Token;
  offer: TokenOffer;
}

const CancelOffer = ({ offer, token }: CancelOfferProps) => {
  const { account } = useAccount();
  const { cancel, status } = useCancel();
  const { toast } = useToast();

  useEffect(() => {
    if (status === "error") {
      toast({
        variant: "canceled",
        title: "The offer could not be canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            formattedPrice={formatEther(BigInt(offer.price))}
          />
        ),
      });
    } else if (status === "success") {
      toast({
        variant: "success",
        title: "Your offer is successfully canceled",
        additionalContent: (
          <ToastExecutedTransactionContent
            formattedPrice={formatEther(BigInt(offer.price))}
            token={token}
          />
        ),
      });
    }
  }, [status]);

  const handleClick = async () => {
    if (!account) {
      return;
    }

    await cancel({
      starknetAccount: account,
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
      orderHash: BigInt(offer.hash),
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
