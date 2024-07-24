"use client";

import { useAccount } from "@starknet-react/core";

import { cn, ellipsableStyles, getRoundedRemainingTime } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

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
      <p className={cn("text-sm font-semibold text-red-500", ellipsableStyles)}>
        {floor_difference}%
      </p>
    );
  }

  return (
    <p className={cn("text-sm font-semibold text-green-500", ellipsableStyles)}>
      +{floor_difference}%
    </p>
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
      {tokenOffers.map((offer, index) => {
        return (
          <>
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

              <div className="mt-3.5 flex items-center justify-between ">
                <div className="flex items-center gap-3.5">
                  <p className="text-sm font-semibold">
                    from{" "}
                    <span className="text-muted-foreground">
                      {ownerOrShortAddress({
                        ownerAddress: offer.source,
                        address,
                      })}
                    </span>
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Expire in {getRoundedRemainingTime(offer.expire_at)}
                </p>
              </div>
            </div>
            {index !== tokenOffers.length - 1 && <Separator className="mb-4" />}
          </>
        );
      })}
    </div>
  );
}
