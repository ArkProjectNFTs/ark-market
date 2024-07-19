"use client";

import { useAccount } from "@starknet-react/core";
import { useQuery } from "react-query";

import type { PropsWithClassName } from "@ark-market/ui";
import { areAddressesEqual, cn } from "@ark-market/ui";

import type { Token, TokenMarketData } from "~/types";
import getTokenMarketData from "~/lib/getTokenMarketData";
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
  tokenMarketData,
  className,
}: TokenActionsProps) {
  const { address } = useAccount();
  const { data } = useQuery(
    ["tokenMarketData", token.collection_address, token.token_id],
    () =>
      getTokenMarketData({
        contractAddress: token.collection_address,
        tokenId: token.token_id,
      }),
    {
      refetchInterval: 10_000,
      initialData: tokenMarketData,
    },
  );

  const isOwner = areAddressesEqual(address, data?.owner);

  if (!data || (!data.has_offer && !data.is_listed)) {
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
        isListed={data.is_listed}
        isAuction={data.listing.is_auction}
        expiresAt={data.listing.end_date}
      />
      <TokenActionsPrice
        startAmount={data.listing.start_amount}
        isAuction={data.listing.is_auction}
        hasOffer={data.has_offer}
        topOffer={data.top_offer}
      />
      <TokenActionsButtons
        isListed={data.is_listed}
        isAuction={data.listing.is_auction}
        hasOffers={data.has_offer}
        isOwner={isOwner}
        token={token}
        tokenMarketData={data}
      />
    </div>
  );
}
