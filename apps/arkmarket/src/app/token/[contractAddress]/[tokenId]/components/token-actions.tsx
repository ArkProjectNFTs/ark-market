"use client";

import { useAccount } from "@starknet-react/core";
import { useQuery } from "react-query";

import type { PropsWithClassName } from "@ark-market/ui";
import { areAddressesEqual, cn } from "@ark-market/ui";

import type { Collection, Token, TokenMarketData } from "~/types";
import getTokenMarketData from "~/lib/getTokenMarketData";
import TokenActionsButtons from "./token-actions-buttons";
import TokenActionsEmpty from "./token-actions-empty";
import TokenActionsHeader from "./token-actions-header";
import TokenActionsPrice from "./token-actions-price";

interface TokenActionsProps {
  collection: Collection;
  token: Token;
  tokenId: string;
  tokenMarketData?: TokenMarketData;
  className?: PropsWithClassName["className"];
}

export default function TokenActions({
  collection,
  token,
  tokenId,
  tokenMarketData,
  className,
}: TokenActionsProps) {
  const account = useAccount();
  const isOwner =
    !!account.address && areAddressesEqual(account.address, token.owner);
  const { data } = useQuery(
    ["tokenMarketData", collection.contract_address, tokenId],
    () =>
      getTokenMarketData({
        contractAddress: collection.contract_address,
        tokenId,
      }),
    {
      refetchInterval: 10_000,
      initialData: tokenMarketData,
    },
  );

  if (!data || (!data.has_offer && !data.is_listed)) {
    return (
      <TokenActionsEmpty
        collection={collection}
        token={token}
        tokenId={tokenId}
        isOwner={isOwner}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg bg-card p-5 lg:px-8 lg:pb-10 lg:pt-8",
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
        collection={collection}
        token={token}
        tokenId={tokenId}
        tokenMarketData={data}
      />
    </div>
  );
}
