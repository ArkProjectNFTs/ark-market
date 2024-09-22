"use client";

import { useEffect, useState } from "react";
import { useFulfillAuction, useFulfillOffer } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { areAddressesEqual, cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Tag } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData } from "~/types";
import { env } from "~/env";
import AcceptOfferDialog from "./accept-offer-dialog";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

interface TokenActionsAcceptBestOfferProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  isAuction: boolean;
  small?: boolean;
}

export default function TokenActionsAcceptBestOffer({
  token,
  tokenMarketData,
  isAuction,
  small,
}: TokenActionsAcceptBestOfferProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();
  const { fulfillOffer, status } = useFulfillOffer();

  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(tokenMarketData.owner, address);

  const { toast } = useToast();

  const isLoading = status === "loading" || statusAuction === "loading";

  const formattedAmount = formatEther(BigInt(tokenMarketData.top_offer.amount));

  const floorDifference =
    ((BigInt(tokenMarketData.top_offer.amount) -
      BigInt(tokenMarketData.floor)) *
      100n) /
    BigInt(tokenMarketData.floor);

  const onConfirm = async () => {
    try {
      if (isAuction) {
        await fulfillAuction({
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          orderHash: tokenMarketData.top_offer.order_hash,
          relatedOrderHash: tokenMarketData.listing.order_hash,
          starknetAccount: account,
          tokenAddress: token.collection_address,
          tokenId: token.token_id,
        });
      } else {
        await fulfillOffer({
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          orderHash: tokenMarketData.top_offer.order_hash,
          starknetAccount: account,
          tokenAddress: token.collection_address,
          tokenId: token.token_id,
        });
      }
    } catch (error) {
      console.log("Error accepting offer", error);
    }
  };

  useEffect(() => {
    if (status === "error" || statusAuction === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Offer not accepted",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.top_offer.amount)}
            formattedPrice={formattedAmount}
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
            token={token}
            price={BigInt(tokenMarketData.top_offer.amount)}
            formattedPrice={formattedAmount}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, statusAuction]);

  if (!account || !isOwner) {
    return null;
  }

  return (
    <AcceptOfferDialog
      token={token}
      onConfirm={onConfirm}
      formattedAmount={formattedAmount}
      isLoading={isLoading}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      floorDifference={floorDifference}
    >
      <Button
        className={cn(small ?? "relative w-full lg:max-w-[50%]")}
        size={small ? "xl" : "xxl"}
      >
        <Tag
          className={cn(small ?? "absolute left-4")}
          size={small ? 20 : 24}
        />
        Accept offer
        <Separator
          orientation="vertical"
          className={cn("h-5", small ? "mx-1" : "mx-2")}
        />
        {formatEther(BigInt(tokenMarketData.top_offer.amount))} ETH
      </Button>
    </AcceptOfferDialog>
  );
}
