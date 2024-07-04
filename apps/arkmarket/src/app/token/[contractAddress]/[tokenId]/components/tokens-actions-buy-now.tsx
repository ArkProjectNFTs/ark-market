"use client";

import { useEffect, useState } from "react";
import { useFulfillListing } from "@ark-project/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import { ShoppingBag } from "lucide-react";
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
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsBuyNow({
  collection,
  token,
  tokenMarketData,
}: TokenActionsBuyNowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { fulfillListing, status } = useFulfillListing();
  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(token.owner, address);

  console.log("status", status);

  const handeClick = async () => {
    setIsOpen(true);
    await fulfillListing({
      starknetAccount: account,
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      tokenAddress: token.contract_address,
      tokenId: token.token_id,
      orderHash: tokenMarketData.order_hash,
      startAmount: tokenMarketData.start_amount,
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
    tokenMarketData.status === "FULFILLED"
  ) {
    return null;
  }

  const isSuccess = status === "success";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="p-6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          {isSuccess ? (
            <>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <div className="mt-6 text-center text-xl font-semibold">
                    Congratulations for your purchase
                  </div>
                  <div className="text-center text-sm">
                    Nice purchase, this NFT is now in your wallet ;)
                  </div>
                </div>
                <TokenActionsTokenOverview
                  collection={collection}
                  token={token}
                  amount={formatEther(BigInt(tokenMarketData.start_amount))}
                />
                <Button onClick={() => setIsOpen(false)} size="xxl">
                  Continue to explore NFTs
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-10">
                <div className="mt-6 text-center text-xl font-semibold">
                  Checking your payment
                </div>
                <div className="mb-6 flex justify-center">
                  <ReloadIcon className="mr-4 size-6 animate-spin" />
                  <div className="text-sm">
                    Checking your payment can take a few seconds...
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Button
        className="relative w-full"
        size="xxl"
        disabled={status === "loading"}
        onClick={handeClick}
      >
        <ShoppingBag size={24} className="absolute left-4" />
        Buy now for {formatEther(BigInt(tokenMarketData.start_amount))} ETH
      </Button>
    </>
  );
}
