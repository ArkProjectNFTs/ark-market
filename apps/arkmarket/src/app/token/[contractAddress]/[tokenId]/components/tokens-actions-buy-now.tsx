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

import type { Collection, Token, TokenMarketData } from "~/types";
import { env } from "~/env";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsBuyNowProps {
  collection: Collection;
  token: Token;
  tokenId: string;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsBuyNow({
  collection,
  token,
  tokenId,
  tokenMarketData,
}: TokenActionsBuyNowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { fulfillListing, status } = useFulfillListing();
  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(token.owner, address);

  const handeClick = async () => {
    setIsOpen(true);
    await fulfillListing({
      starknetAccount: account,
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      tokenAddress: collection.contract_address,
      tokenId,
      orderHash: tokenMarketData.listing.order_hash,
      startAmount: tokenMarketData.listing.start_amount,
    });
  };

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast.error("Purchase cancelled by user");
    }
  }, [status]);

  if (
    !account ||
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
          className="justify-normal p-6 lg:justify-center"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="mx-auto mt-6 size-20 rounded-full bg-slate-800" />
              <div className="text-center text-xl font-semibold">
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
              collection={collection}
              token={token}
              tokenId={tokenId}
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
              <div className="flex flex-col items-center gap-6 rounded-md bg-card p-6 lg:flex-row lg:p-4">
                <LoaderCircle className="size-10 animate-spin" />

                <div className="text-center lg:text-left">
                  <div className="text-xl font-semibold">
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
        onClick={handeClick}
      >
        <ShoppingBag size={24} className="absolute left-4" />
        Buy now for{" "}
        {formatEther(BigInt(tokenMarketData.listing.start_amount ?? 0))} ETH
      </Button>
    </>
  );
}
