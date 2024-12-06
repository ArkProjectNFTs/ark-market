"use client";

import { useEffect, useState } from "react";
import { useFulfillAuction, useFulfillOffer } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { Button } from "@ark-market/ui/button";
import { useToast } from "@ark-market/ui/use-toast";

import type { TokenMarketData, TokenMetadata } from "~/types";
import { env } from "~/env";
import AcceptOfferDialog from "./accept-offer-dialog";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

function computeFloorDifference(offerPrice: string, floor?: string | null) {
  if (!floor) {
    return BigInt("0");
  }

  return ((BigInt(offerPrice) - BigInt(floor)) * 100n) / BigInt(floor);
}

interface AcceptOfferProps {
  onSuccess: () => void;
  collectionAddress: string;
  tokenId: string;
  collectionName: string;
  tokenMetadata?: TokenMetadata;
  offerPrice: string;
  offerOrderHash: string;
  isListed: boolean;
  listing: TokenMarketData["listing"];
  floor?: string | null;
  computedFloorDifference?: string | null;
}

const AcceptOffer: React.FC<AcceptOfferProps> = ({
  onSuccess,
  collectionAddress,
  collectionName,
  tokenId,
  tokenMetadata,
  offerOrderHash,
  offerPrice,
  isListed,
  listing,
  floor,
  computedFloorDifference,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useAccount();
  const { fulfillOffer, status } = useFulfillOffer();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();

  const { toast } = useToast();
  const formattedAmount = formatEther(BigInt(offerPrice));

  const floorDifference = !computedFloorDifference
    ? computeFloorDifference(offerPrice, floor)
    : BigInt(parseInt(computedFloorDifference));

  useEffect(() => {
    if (status === "success") {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onConfirm = async () => {
    if (isListed && listing.is_auction) {
      await fulfillAuction({
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        orderHash: BigInt(listing.order_hash),
        relatedOrderHash: BigInt(offerOrderHash),
        starknetAccount: account,
        startAmount: offerPrice,
        tokenAddress: collectionAddress,
        tokenId: tokenId,
      });
    } else {
      await fulfillOffer({
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        orderHash: offerOrderHash,
        starknetAccount: account,
        tokenAddress: collectionAddress,
        tokenId: tokenId,
      });
    }
  };

  const isLoading = status === "loading" || statusAuction === "loading";

  useEffect(() => {
    if (status === "error" || statusAuction === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Offer not accepted",
        additionalContent: (
          <ToastRejectedTransactionContent
            price={BigInt(offerPrice)}
            formattedPrice={formattedAmount}
            collectionName={collectionName}
            tokenId={tokenId}
            tokenMetadata={tokenMetadata}
          />
        ),
      });
    } else if (status === "success" || statusAuction === "success") {
      setIsOpen(false);
      toast({
        variant: "success",
        title: "Offer successfully accepted",
        additionalContent: (
          <ToastExecutedTransactionContent
            price={BigInt(offerPrice)}
            formattedPrice={formattedAmount}
            collectionName={collectionName}
            tokenId={tokenId}
            tokenMetadata={tokenMetadata}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, statusAuction]);

  return (
    <AcceptOfferDialog
      collectionName={collectionName}
      tokenMetadata={tokenMetadata}
      onConfirm={onConfirm}
      formattedAmount={formattedAmount}
      isLoading={isLoading}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      floorDifference={floorDifference}
    >
      <Button size="sm" disabled={isLoading}>
        Accept
      </Button>
    </AcceptOfferDialog>
  );
};

export default AcceptOffer;
