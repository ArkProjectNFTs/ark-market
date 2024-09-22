"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { cn, ellipsableStyles, getRoundedRemainingTime } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import ConnectWalletModal from "~/components/connect-wallet-modal";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";
import AcceptOffer from "./accept-offer";
import CancelOffer from "./cancel-offer";

interface TokenOffersListItemProps {
  offer: TokenOffer;
  token: Token;
  tokenMarketData: TokenMarketData;
  isLast: boolean;
}

export default function TokenOffersListItem({
  offer,
  token,
  tokenMarketData,
  isLast,
}: TokenOffersListItemProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();

  const isOwner = address
    ? validateAndParseAddress(address) ===
      validateAndParseAddress(tokenMarketData.owner)
    : false;
  const isOfferer = address
    ? validateAndParseAddress(address) === validateAndParseAddress(offer.source)
    : false;

  if (isSuccess) {
    return null;
  }

  return (
    <Fragment key={`${offer.hash}-${offer.offer_id}`}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <PriceTag price={offer.price} className="h-7 text-xs" />
            {offer.floor_difference ? (
              <p
                className={cn(
                  "text-sm font-semibold",
                  ellipsableStyles,
                  offer.floor_difference >= 0
                    ? "text-green-500"
                    : "text-red-500",
                )}
              >
                {offer.floor_difference}%
              </p>
            ) : (
              "_"
            )}
          </div>
          {address ? (
            <>
              {isOwner && (
                <AcceptOffer
                  offer={offer}
                  token={token}
                  tokenMarketData={tokenMarketData}
                  onSuccess={() => setIsSuccess(true)}
                />
              )}
              {isOfferer && (
                <CancelOffer
                  onSuccess={() => setIsSuccess(true)}
                  tokenId={token.token_id}
                  offerHash={offer.hash}
                  collectionAddress={token.collection_address}
                  offerPrice={offer.price}
                  collectionName={token.collection_name}
                  tokenMetadata={token.metadata}
                />
              )}
            </>
          ) : (
            <ConnectWalletModal>
              <Button size="sm">Connect wallet</Button>
            </ConnectWalletModal>
          )}
        </div>

        <div className="mt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <p className="text-sm font-semibold">
              from{" "}
              <span className="text-muted-foreground">
                <Link href={`/wallet/${offer.source}`}>
                  {ownerOrShortAddress({
                    ownerAddress: offer.source,
                    address,
                  })}
                </Link>
              </span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Expire in {getRoundedRemainingTime(offer.expire_at)}
          </p>
        </div>
      </div>
      {isLast || <Separator className="mb-4" />}
    </Fragment>
  );
}
