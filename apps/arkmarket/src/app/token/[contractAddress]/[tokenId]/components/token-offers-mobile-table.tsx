"use client";

import { getRoundedRemainingTime, shortAddress } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

import type { TokenOffer } from "../queries/getTokenData";
import type { TokenMarketData } from "~/types";
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
      <p className="text-sm font-semibold text-red-500">{floor_difference}%</p>
    );
  }
  return (
    <p className="text-sm font-semibold text-green-500">+{floor_difference}%</p>
  );
}

interface TokenOffersMobileTableProps {
  tokenOffers: TokenOffer[];
  tokenContractAdress: string;
  tokenId: string;
  owner: string;
  tokenMarketData: TokenMarketData | null;
}

export default function TokenOffersMobileTable({
  owner,
  tokenContractAdress,
  tokenId,
  tokenMarketData,
  tokenOffers,
}: TokenOffersMobileTableProps) {
  return (
    <div className="lg:hidden">
      <Separator className="my-4" />
      {tokenOffers.map((offer, index) => {
        return (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <PriceTag price={offer.price} className="h-7 text-xs" />
                  <TokenFloorDifference
                    floor_difference={offer.floor_difference}
                  />
                </div>

                <TokenOffersTableAction
                  owner={owner}
                  offerSourceAddress={offer.source}
                  offerOrderHash={offer.hash}
                  tokenContractAddress={tokenContractAdress}
                  tokenId={tokenId}
                  offerAmount={offer.price}
                  tokenIsListed={tokenMarketData?.is_listed ?? false}
                  tokenListingOrderHash={tokenMarketData?.order_hash ?? null}
                />
              </div>

              <div className="mt-3.5 flex items-center justify-between ">
                <div className="flex items-center gap-3.5">
                  <p className="text-sm font-semibold">
                    from{" "}
                    <span className="text-muted-foreground">
                      {offer.source ? shortAddress(offer.source) : "_"}
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
