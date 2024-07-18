"use client";

import { useEffect, useState } from "react";
import { useFulfillListing } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { FileSignature, LoaderCircle, ShoppingBag } from "lucide-react";
import { formatEther } from "viem";

import { areAddressesEqual, cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent } from "@ark-market/ui/dialog";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData } from "~/types";
import Media from "~/components/media";
import { env } from "~/env";
import useConnectWallet from "~/hooks/useConnectWallet";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsBuyNowProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  small?: boolean;
}

export default function TokenActionsBuyNow({
  token,
  tokenMarketData,
  small,
}: TokenActionsBuyNowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { fulfillListing, status } = useFulfillListing();
  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(token.owner, address);
  const { toast } = useToast();

  const buy = async () => {
    setIsOpen(true);

    await fulfillListing({
      starknetAccount: account,
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      tokenAddress: token.collection_address,
      tokenId: token.token_id,
      orderHash: tokenMarketData.listing.order_hash,
      startAmount: tokenMarketData.listing.start_amount,
    });
  };

  const { ensureConnect } = useConnectWallet({
    account,
    onConnect: () => {
      void buy();
    },
  });

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Purchase canceled",
        additionalContent: (
          <div className="mt-5 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Media
                  src={token.metadata?.animation_url ?? token.metadata?.image}
                  alt={
                    token.metadata?.name ??
                    `${token.collection_name} #${token.token_id}`
                  }
                  mediaKey={
                    token.metadata?.animation_key ?? token.metadata?.image_key
                  }
                  height={84}
                  width={84}
                  className="size-10 rounded-xs object-contain"
                />
                <p className="font-medium">
                  {token.metadata?.name ??
                    `${token.collection_name} #${token.token_id}`}
                </p>
              </div>
              <div className="text-end">
                <p className="font-medium">
                  {formatEther(
                    BigInt(tokenMarketData.listing.start_amount ?? 0),
                  )}{" "}
                  ETH
                </p>
                <p className="text-xs font-medium">$---</p>
              </div>
            </div>
            <div className="flex h-10 w-full items-center rounded-xs bg-slate-600 px-4 text-white opacity-50">
              <FileSignature className="size-4" />
              <p className="w-full text-center text-sm">
                You didn't sign the transaction in your wallet
              </p>
            </div>
          </div>
        ),
      });
    }
  }, [status]);

  if (
    isOwner ||
    !tokenMarketData.is_listed ||
    tokenMarketData.buy_in_progress
  ) {
    return null;
  }

  const isSuccess = status === "success";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="justify-normal lg:justify-center"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-10 sm:gap-8">
            <div className="flex flex-col gap-4">
              <div className="mx-auto mt-6 size-20 rounded-full bg-slate-800" />
              <div className="mb-5 text-center text-xl font-semibold sm:mb-0">
                {isSuccess
                  ? "Congratulations for your purchase"
                  : "Confirm your purchase"}
              </div>
              {isSuccess && (
                <div className="mb-4 text-center text-sm">
                  Nice purchase, this NFT is now in your wallet ;)
                </div>
              )}
            </div>

            <TokenActionsTokenOverview
              token={token}
              amount={formatEther(
                BigInt(tokenMarketData.listing.start_amount ?? 0),
              )}
            />

            {isSuccess ? (
              <Button
                onClick={() => setIsOpen(false)}
                size="xl"
                className="mx-auto w-full lg:w-fit"
              >
                Continue to explore NFTs
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-md bg-card p-5 lg:flex-row lg:gap-5 lg:p-4">
                <LoaderCircle className="size-10 animate-spin" />

                <div className="text-center lg:text-left">
                  <div className="text-lg font-semibold">
                    Checking your payment
                  </div>
                  <div className="text-sm">
                    Checking your payment can take a few seconds...
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Button
        className={cn(small ?? "relative w-full lg:max-w-[50%]")}
        size={small ? "xl" : "xxl"}
        disabled={status === "loading"}
        onClick={(e) => {
          ensureConnect(e);

          if (account) {
            void buy();
          }
        }}
      >
        <ShoppingBag
          size={small ? 20 : 24}
          className={cn("left-4", small ? "" : "absolute")}
        />
        {"Buy now for "}
        {formatEther(BigInt(tokenMarketData.listing.start_amount ?? 0))} ETH
      </Button>
    </>
  );
}
