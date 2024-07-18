"use client";

import { useEffect, useState } from "react";
import { useFulfillListing } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import { formatEther } from "viem";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent } from "@ark-market/ui/dialog";
import { toast } from "@ark-market/ui/toast";

import type { Token, TokenMarketData } from "~/types";
import { env } from "~/env";
import useConnectWallet from "~/hooks/useConnectWallet";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsBuyNowProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsBuyNow({
  token,
  tokenMarketData,
}: TokenActionsBuyNowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { fulfillListing, status } = useFulfillListing();
  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(token.owner, address);

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
      toast.error("Purchase cancelled by user");
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
        className="relative w-full"
        size="xxl"
        disabled={status === "loading"}
        onClick={(e) => {
          ensureConnect(e);

          if (account) {
            void buy();
          }
        }}
      >
        <ShoppingBag size={24} className="absolute left-4" />
        Buy now for{" "}
        {formatEther(BigInt(tokenMarketData.listing.start_amount ?? 0))} ETH
      </Button>
    </>
  );
}
