"use client";

import { useEffect, useState } from "react";
import { useFulfillListing } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { useQueryClient } from "@tanstack/react-query";
import { formatEther } from "viem";

import { areAddressesEqual } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { toast as sonner } from "@ark-market/ui/sonner";
import { useToast } from "@ark-market/ui/use-toast";

import type { CollectionToken, TokenMarketData } from "~/types";
import BuyNowDialog from "~/components/buy-now-dialog";
import { ETH } from "~/constants/tokens";
import { env } from "~/env";
import useBalance from "~/hooks/useBalance";
import useConnectWallet from "~/hooks/useConnectWallet";
import getTokenMarketData from "~/lib/getTokenMarketData";
import ToastExecutedTransactionContent from "../../../token/[contractAddress]/[tokenId]/components/toast-executed-transaction-content";
import ToastRejectedTransactionContent from "../../../token/[contractAddress]/[tokenId]/components/toast-rejected-transaction-content";

interface CollectionItemsBuyNowProps {
  token: CollectionToken;
}

export default function CollectionItemsBuyNow({
  token,
}: CollectionItemsBuyNowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { fulfillListing, status } = useFulfillListing();
  const { account, address } = useAccount();
  const { data } = useBalance({ token: ETH });
  const { toast } = useToast();
  const isOwner = areAddressesEqual(token.owner, address);
  const queryClient = useQueryClient();

  const buy = async () => {
    let tokenMarketData: TokenMarketData | undefined;

    try {
      tokenMarketData = await queryClient.fetchQuery({
        queryKey: ["tokenMarketData", token.collection_address, token.token_id],
        queryFn: () =>
          getTokenMarketData({
            contractAddress: token.collection_address,
            tokenId: token.token_id,
          }),
      });
    } catch (error) {
      // TODO: log error via sentry
      console.log(error);
      sonner.error("Error fetching token market data");
    }

    if (!tokenMarketData) {
      return;
    }

    if (data.value < BigInt(tokenMarketData.listing.start_amount ?? 0)) {
      sonner.error("Insufficient balance");
      return;
    }

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
          <ToastRejectedTransactionContent
            formattedPrice={formatEther(BigInt(token.price ?? 0))}
            token={token}
          />
        ),
      });
    } else if (status === "success") {
      toast({
        variant: "success",
        title: "Your token is successfully listed!",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            formattedPrice={formatEther(BigInt(token.price ?? 0))}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (isOwner || !token.price) {
    return null;
  }

  return (
    <>
      <BuyNowDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSuccess={status === "success"}
        token={token}
        price={token.price}
      />
      <div className="absolute bottom-0 left-0 w-full bg-card opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          className="h-10 w-full rounded-none opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          size="xl"
          disabled={status === "loading"}
          onClick={(e) => {
            e.preventDefault();
            ensureConnect(e);

            if (account) {
              void buy();
            }
          }}
        >
          Buy now
        </Button>
      </div>
    </>
  );
}
