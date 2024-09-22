"use client";

import React, { useEffect } from "react";
import { useCancel } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { Button } from "@ark-market/ui/button";
import { useToast } from "@ark-market/ui/use-toast";

import type { TokenMetadata } from "~/types";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

interface CancelOfferProps {
  collectionAddress: string;
  collectionName: string;
  offerHash: string;
  offerPrice: string;
  onSuccess: () => void;
  tokenId: string;
  tokenMetadata?: TokenMetadata;
}

const CancelOffer = ({
  collectionAddress,
  collectionName,
  offerHash,
  offerPrice,
  onSuccess,
  tokenId,
  tokenMetadata,
}: CancelOfferProps) => {
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
            price={BigInt(offerPrice)}
            formattedPrice={formatEther(BigInt(offerPrice))}
            collectionName={collectionName}
            tokenId={tokenId}
            tokenMetadata={tokenMetadata}
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
            price={BigInt(offerPrice)}
            formattedPrice={formatEther(BigInt(offerPrice))}
            collectionName={collectionName}
            tokenId={tokenId}
            tokenMetadata={tokenMetadata}
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
      tokenAddress: collectionAddress,
      tokenId: BigInt(tokenId),
      orderHash: BigInt(offerHash),
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
