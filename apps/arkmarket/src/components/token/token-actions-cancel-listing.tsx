"use client";

import { useEffect } from "react";
import { useCancel } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { areAddressesEqual, cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { ListX, LoaderCircle } from "@ark-market/ui/icons";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData } from "~/types";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";

interface TokenActionsCancelListingProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  small?: boolean;
}

export default function TokenActionsCancelListing({
  token,
  tokenMarketData,
  small,
}: TokenActionsCancelListingProps) {
  const { account, address } = useAccount();
  const { cancel, status } = useCancel();
  const isOwner = areAddressesEqual(tokenMarketData.owner, address);
  const { toast } = useToast();

  useEffect(() => {
    if (status === "error") {
      toast({
        variant: "canceled",
        title: "The listing could not be canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={formatEther(
              BigInt(tokenMarketData.listing.start_amount ?? 0),
            )}
          />
        ),
      });
    } else if (status === "success") {
      toast({
        variant: "success",
        title: "Your listing is successfully canceled",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={formatEther(
              BigInt(tokenMarketData.listing.start_amount ?? 0),
            )}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!account || !isOwner || !tokenMarketData.is_listed) {
    return;
  }

  const handleClick = async () => {
    await cancel({
      starknetAccount: account,
      orderHash: BigInt(tokenMarketData.listing.order_hash),
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
    });
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(small ?? "relative w-full lg:max-w-[50%]")}
      size={small ? "xl" : "xxl"}
      variant="secondary"
    >
      {status === "loading" ? (
        <LoaderCircle
          className={cn("animate-spin", small ?? "absolute left-4")}
          size={small ? 20 : 24}
        />
      ) : (
        <ListX
          size={small ? 20 : 24}
          className={cn(small ?? "absolute left-4")}
        />
      )}
      Cancel listing
    </Button>
  );
}
