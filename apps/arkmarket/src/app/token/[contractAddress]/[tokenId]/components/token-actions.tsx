"use client";

import { useAccount } from "@starknet-react/core";
import { useQuery } from "react-query";
import { hexToNumber } from "viem";

import type { PropsWithClassName } from "@ark-market/ui";
import { areAddressesEqual, cn } from "@ark-market/ui";

import type { Collection, Token, TokenMarketData } from "~/types";
import { getOrderbookCollectionToken } from "~/app/assets/[contract_address]/[token_id]/data";
import TokenActionsButtons from "./token-actions-buttons";
import TokenActionsEmpty from "./token-actions-empty";
import TokenActionsHeader from "./token-actions-header";
import TokenActionsPrice from "./token-actions-price";

interface TokenActionsProps {
  collection: Collection;
  token: Token;
  tokenMarketData: TokenMarketData | null;
  className?: PropsWithClassName["className"];
}

export default function TokenActions({
  collection,
  token,
  tokenMarketData,
  className,
}: TokenActionsProps) {
  const account = useAccount();
  const isOwner =
    !!account.address && areAddressesEqual(account.address, token.owner);
  const { data } = useQuery(
    ["tokenMarketData", token.contract_address, token.token_id],
    () =>
      getOrderbookCollectionToken({
        contract_address: token.contract_address,
        token_id: token.token_id,
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
        isOwner={isOwner}
      />
    );
  }

  const isListed = data.is_listed;
  const isAuction =
    isListed && hexToNumber(data.end_amount as `0x${string}`) > 0;

  return (
    <div
      className={cn(
        "rounded-lg bg-card p-5 lg:px-8 lg:pb-10 lg:pt-8",
        className,
      )}
    >
      <TokenActionsHeader
        isListed={isListed}
        isAuction={isAuction}
        expiresAt={data.end_date}
      />
      <TokenActionsPrice
        startAmount={data.start_amount}
        isAuction={isAuction}
        hasOffer={data.has_offer}
        topOffer={data.top_bid}
      />
      <TokenActionsButtons
        isListed={isListed}
        isAuction={isAuction}
        hasOffers={data.has_offer}
        isOwner={isOwner}
        startAmount={data.start_amount}
        collection={collection}
        token={token}
        tokenMarketData={data}
      />
    </div>
  );
}
