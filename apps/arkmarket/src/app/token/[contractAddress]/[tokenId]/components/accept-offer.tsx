"use client";

import { useEffect, useState } from "react";
import { useFulfillAuction, useFulfillOffer } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { Button } from "@ark-market/ui/button";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import { env } from "~/env";
import AcceptOfferDialog from "./accept-offer-dialog";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

interface AcceptOfferProps {
  offer: TokenOffer;
  token: Token;
  tokenMarketData: TokenMarketData;
  onSuccess: () => void;
}

const AcceptOffer: React.FC<AcceptOfferProps> = ({
  offer,
  token,
  tokenMarketData,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useAccount();
  const { fulfillOffer, status } = useFulfillOffer();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();

  const { toast } = useToast();
  const formattedAmount = formatEther(BigInt(offer.price));

  const floorDifference =
    ((BigInt(offer.price) - BigInt(tokenMarketData.floor)) * 100n) /
    BigInt(tokenMarketData.floor);

  useEffect(() => {
    if (status === "success") {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onConfirm = async () => {
    if (tokenMarketData.is_listed && tokenMarketData.listing.is_auction) {
      await fulfillAuction({
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        orderHash: tokenMarketData.listing.order_hash,
        relatedOrderHash: offer.hash,
        starknetAccount: account,
        startAmount: offer.price,
        tokenAddress: token.collection_address,
        tokenId: token.token_id,
      });
    } else {
      await fulfillOffer({
        brokerId: env.NEXT_PUBLIC_BROKER_ID,
        orderHash: offer.hash,
        starknetAccount: account,
        tokenAddress: token.collection_address,
        tokenId: token.token_id,
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
            token={token}
            price={BigInt(offer.price)}
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
            price={BigInt(offer.price)}
            formattedPrice={formattedAmount}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, statusAuction]);

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
      <Button size="sm" disabled={isLoading}>
        Accept
      </Button>
    </AcceptOfferDialog>
  );
};

export default AcceptOffer;
