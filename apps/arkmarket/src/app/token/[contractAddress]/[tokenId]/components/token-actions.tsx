"use client";

import { useAccount } from "@starknet-react/core";

import type { PropsWithClassName } from "@ark-market/ui";
import { areAddressesEqual, cn } from "@ark-market/ui";

import type { Token, TokenMarketData } from "~/types";
import useTokenMarketdata from "~/hooks/useTokenMarketData";
import TokenActionsButtons from "./token-actions-buttons";
import TokenActionsEmpty from "./token-actions-empty";
import TokenActionsHeader from "./token-actions-header";
import TokenActionsPrice from "./token-actions-price";

interface TokenActionsProps {
  token: Token;
  tokenMarketData?: TokenMarketData;
  className?: PropsWithClassName["className"];
}

export default function TokenActions({
  token,
  tokenMarketData: initialTokenMarketData,
  className,
}: TokenActionsProps) {
  const { address } = useAccount();
  const { data: tokenMarketData } = useTokenMarketdata({
    collectionAddress: token.collection_address,
    tokenId: token.token_id,
    initialData: initialTokenMarketData,
  });

  const isOwner = areAddressesEqual(address, tokenMarketData?.owner);

  if (
    !tokenMarketData ||
    (!tokenMarketData.has_offer && !tokenMarketData.is_listed)
  ) {
    return <TokenActionsEmpty token={token} isOwner={isOwner} />;
  }

  return (
    <div
      className={cn(
        "bg-card p-5 lg:rounded-lg lg:px-8 lg:pb-10 lg:pt-8",
        className,
      )}
    >
      <TokenActionsHeader
        isListed={tokenMarketData.is_listed}
        isAuction={tokenMarketData.listing.is_auction}
        expiresAt={tokenMarketData.listing.end_date}
      />
      <TokenActionsPrice
        startAmount={tokenMarketData.listing.start_amount}
        isListed={tokenMarketData.is_listed}
        isAuction={tokenMarketData.listing.is_auction}
        hasOffer={tokenMarketData.has_offer}
        topOffer={tokenMarketData.top_offer}
      />
      <TokenActionsButtons
        isListed={tokenMarketData.is_listed}
        isAuction={tokenMarketData.listing.is_auction}
        hasOffers={tokenMarketData.has_offer}
        isOwner={isOwner}
        token={token}
        tokenMarketData={tokenMarketData}
      />
    </div>
  );
}
