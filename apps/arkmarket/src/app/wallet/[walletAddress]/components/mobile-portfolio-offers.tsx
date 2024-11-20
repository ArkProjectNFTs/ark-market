"use client";

import React from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import { cn, focusableStyles, getRoundedRemainingTime } from "@ark-market/ui";
import { NoActivity } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

import type { PortfolioOffersTypeValues } from "~/lib/getPortfolioOffers";
import type { PortfolioOffers } from "~/types";
import AcceptOffer from "~/app/token/[contractAddress]/[tokenId]/components/accept-offer";
import CancelOffer from "~/app/token/[contractAddress]/[tokenId]/components/cancel-offer";
import Media from "~/components/media";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface MobilePortfolioOffersProps {
  isOwner: boolean;
  offerType: PortfolioOffersTypeValues;
  portfolioOffers: PortfolioOffers[];
}

export default function MobilePortfolioOffers({
  isOwner,
  offerType,
  portfolioOffers,
}: MobilePortfolioOffersProps) {
  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-4 px-5">
      {portfolioOffers.length === 0 ? (
        <div className="flex flex-col items-center gap-3 pt-8 text-muted-foreground">
          <NoActivity size={42} />
          <p className="text-xl font-semibold">No offers {offerType} yet!</p>
        </div>
      ) : (
        portfolioOffers.map((offer) => {
          const parsedFloorDifference = parseFloat(
            offer.floor_difference ?? "",
          );
          return (
            <React.Fragment key={offer.hash}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Media
                    className="size-8 rounded-xs object-contain"
                    height={64}
                    width={64}
                    alt={offer.metadata?.name ?? "Unnamed Token"}
                    src={offer.metadata?.image ?? ""}
                    mediaKey={offer.metadata?.image_key ?? ""}
                  />
                  <Link
                    href={`/token/${offer.collection_address}/${offer.token_id}`}
                    className={focusableStyles}
                  >
                    <p className="text-sm font-semibold">
                      {offer.metadata?.name ?? "Unnamed Token"}
                    </p>
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <PriceTag
                      price={offer.price}
                      currency={offer.currency}
                      className="h-7 text-xs"
                    />{" "}
                    <p
                      className={cn(
                        "text-sm font-medium",
                        parsedFloorDifference < 0
                          ? "text-red-500"
                          : "text-green-500",
                      )}
                    >
                      {parsedFloorDifference >= 0 && "+"}
                      {offer.floor_difference ?? "0"}%
                    </p>
                  </div>
                  {isOwner && (
                    <>
                      {offerType === "made" ? (
                        <CancelOffer
                          collectionAddress={offer.collection_address}
                          offerOrderHash={offer.hash}
                          offerPrice={offer.price}
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onSuccess={() => {}}
                          collectionName={offer.collection_name}
                          tokenId={offer.token_id}
                          tokenMetadata={offer.metadata}
                        />
                      ) : (
                        <AcceptOffer
                          collectionAddress={offer.collection_address}
                          collectionName={offer.collection_name}
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onSuccess={() => {}}
                          tokenId={offer.token_id}
                          tokenMetadata={offer.metadata}
                          offerOrderHash={offer.hash}
                          offerPrice={offer.price}
                          isListed={offer.is_listed}
                          listing={offer.listing}
                          computedFloorDifference={offer.floor_difference}
                        />
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {offerType === "made" ? "To " : "From "}
                    {offerType === "made" ? (
                      offer.to_address ? (
                        <Link
                          href={`/wallet/${offer.to_address}`}
                          className="text-muted-foreground"
                        >
                          {ownerOrShortAddress({
                            ownerAddress: offer.to_address,
                            address,
                          })}
                        </Link>
                      ) : (
                        "_"
                      )
                    ) : offer.from_address ? (
                      <Link
                        href={`/wallet/${offer.from_address}`}
                        className="text-muted-foreground"
                      >
                        {ownerOrShortAddress({
                          ownerAddress: offer.from_address,
                          address,
                        })}
                      </Link>
                    ) : (
                      "_"
                    )}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    Expire in{" "}
                    {offer.expire_at
                      ? getRoundedRemainingTime(offer.expire_at)
                      : "_"}
                  </p>
                </div>
              </div>
              <Separator />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}
