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
  onSuccess: () => void;
}

const CancelOffer = ({ offer, token, onSuccess }: CancelOfferProps) => {
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
            price={BigInt(offer.price)}
            formattedPrice={formatEther(BigInt(offer.price))}
          />
        ),
      });
    } else if (status === "success") {
      onSuccess();
      toast({
        variant: "success",
        title: "Your offer is successfully canceled",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={BigInt(offer.price)}
            formattedPrice={formatEther(BigInt(offer.price))}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
