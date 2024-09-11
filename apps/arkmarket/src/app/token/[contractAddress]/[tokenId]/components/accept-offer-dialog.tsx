"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useFulfillAuction, useFulfillOffer } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { formatEther, parseEther } from "viem";

import { areAddressesEqual, cn, ellipsableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@ark-market/ui/dialog";
import { LoaderCircle, VerifiedIcon } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";
import { useToast } from "@ark-market/ui/use-toast";

import Media from "~/components/media";
import { env } from "~/env";
import usePrices from "~/hooks/usePrices";
import { Token, TokenMarketData } from "~/types";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

interface AcceptOfferDialogProps {
  token: Token;
  isAuction: boolean;
  tokenMarketData: TokenMarketData;
}

export default function AcceptOfferDialog({
  token,
  tokenMarketData,
  isAuction,
  children,
}: PropsWithChildren<AcceptOfferDialogProps>) {
  const [isOpen, setIsOpen] = useState(true);
  const { convertInUsd } = usePrices();
  const { fulfill: fulfillAuction, status: statusAuction } =
    useFulfillAuction();
  const { fulfillOffer, status } = useFulfillOffer();

  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(tokenMarketData?.owner, address);

  const { toast } = useToast();

  const isLoading = status === "loading" || statusAuction === "loading";

  const formattedAmount = formatEther(BigInt(tokenMarketData.top_offer.amount));
  const ethAmountInUsd = convertInUsd({
    amount: parseEther(formattedAmount),
  });

  const floorDifference =
    ((BigInt(tokenMarketData.top_offer.amount) -
      BigInt(tokenMarketData.floor)) *
      100n) /
    BigInt(tokenMarketData.floor);
  const isHigherOfferThanFloor = floorDifference >= 0n;

  const handleClick = async () => {
    try {
      if (isAuction) {
        await fulfillAuction({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
          tokenId: token.token_id,
          orderHash: tokenMarketData.top_offer.order_hash,
          relatedOrderHash: tokenMarketData.listing.order_hash,
        });
      } else {
        await fulfillOffer({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
          tokenId: token.token_id,
          orderHash: tokenMarketData.top_offer.order_hash,
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold">Approve sale</h2>
          </div>
          <div className="flex items-center gap-4">
            <Media
              alt={token.metadata?.name ?? "Empty"}
              className="aspect-square size-16 flex-shrink-0 rounded-xl object-contain"
              height={192}
              mediaKey={token.metadata?.image_key}
              src={token.metadata?.image}
              width={192}
            />
            <div>
              <p
                className={cn("w-full text-xl font-semibold", ellipsableStyles)}
              >
                {token.metadata?.name}
              </p>
              <div className="flex w-full items-center gap-2">
                <p
                  className={cn(
                    "text-lg font-semibold text-muted-foreground",
                    ellipsableStyles,
                  )}
                >
                  {token.collection_name}
                </p>

                <VerifiedIcon className="size-4 flex-shrink-0 text-primary sm:size-6" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xl font-semibold">
              <p>Price</p>
              <p>{formattedAmount} ETH</p>
            </div>
            <div className="flex flex-col items-end justify-end">
              <p className="text-sm font-medium text-muted-foreground">
                ${ethAmountInUsd}
              </p>
              <p
                className={cn(
                  "text-sm font-medium text-red-500",
                  isHigherOfferThanFloor ? "text-green-500" : "text-red-500",
                )}
              >
                {floorDifference.toString()}%{" "}
                {isHigherOfferThanFloor ? "higher" : "lower"} than floor price
              </p>
            </div>
          </div>
          <Separator />

          <div className="text-xl font-semibold">
            <div className="flex items-center justify-between">
              <p>Earning details</p>
              <p>--- ETH</p>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
              <p>Arkmarket fees 2%</p>
              <p>-- ETH</p>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-sm font-medium text-muted-foreground">
              <p>Creator royalties 2%</p>
              <p>-- ETH</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              size="xl"
              onClick={handleClick}
              disabled={isLoading}
              className="mx-auto"
            >
              {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
              <p>Accept offer</p>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
