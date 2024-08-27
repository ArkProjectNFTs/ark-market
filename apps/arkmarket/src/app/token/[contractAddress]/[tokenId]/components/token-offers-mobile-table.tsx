"use client";

import React from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import { getRoundedRemainingTime } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";
import { Typography } from "@ark-market/ui/typography";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";
import TokenOffersTableAction from "./token-offers-table-action";

interface TokenFloorDifferenceProps {
  floor_difference: number | null;
}

function TokenFloorDifference({ floor_difference }: TokenFloorDifferenceProps) {
  if (floor_difference === null) {
    return "_";
  }

  if (floor_difference < 0) {
    return (
      <Typography ellipsable variant="button_text_s" className="text-red-500">
        {floor_difference}%
      </Typography>
    );
  }

  return (
    <Typography ellipsable variant="button_text_s" className="text-green-500">
      +{floor_difference}%
    </Typography>
  );
}

interface TokenOffersMobileTableProps {
  tokenOffers: TokenOffer[];
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenOffersMobileTable({
  token,
  tokenMarketData,
  tokenOffers,
}: TokenOffersMobileTableProps) {
  const { address } = useAccount();

  return (
    <div className="lg:hidden">
      <Separator className="my-4" />
      {tokenOffers.map((offer, index) => (
        <React.Fragment key={`${offer.hash}-${offer.offer_id}`}>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 overflow-hidden">
                <PriceTag price={offer.price} className="h-7 text-xs" />
                <TokenFloorDifference
                  floor_difference={offer.floor_difference}
                />
              </div>

              <TokenOffersTableAction
                offer={offer}
                token={token}
                tokenMarketData={tokenMarketData}
              />
            </div>

            <div className="mt-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <Typography variant="button_text_s">
                  from{" "}
                  <span className="text-muted-foreground">
                    <Link href={`/wallet/${offer.source}`}>
                      {ownerOrShortAddress({
                        ownerAddress: offer.source,
                        address,
                      })}
                    </Link>
                  </span>
                </Typography>
              </div>
              <p className="text-xs text-muted-foreground">
                Expire in {getRoundedRemainingTime(offer.expire_at)}
              </p>
            </div>
          </div>
          {index !== tokenOffers.length - 1 && <Separator className="mb-4" />}
        </React.Fragment>
      ))}
    </div>
  );
}
