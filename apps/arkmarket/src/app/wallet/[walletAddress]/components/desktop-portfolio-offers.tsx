import { useRef } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  getRoundedRemainingTime,
} from "@ark-market/ui";
import { NoActivity, VerifiedIcon } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { PortfolioOffersTypeValues } from "~/lib/getPortfolioOffers";
import type { PortfolioOffers } from "~/types";
import AcceptOffer from "~/app/token/[contractAddress]/[tokenId]/components/accept-offer";
import CancelOffer from "~/app/token/[contractAddress]/[tokenId]/components/cancel-offer";
import Media from "~/components/media";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

const gridTemplateColumnValue =
  "grid-cols-[minmax(14rem,2fr)_repeat(5,minmax(10rem,1fr))]";

interface DesktopPortfolioOffersProps {
  isOwner: boolean;
  offerType: PortfolioOffersTypeValues;
  portfolioOffers: PortfolioOffers[];
}

export default function DesktopPortfolioOffers({
  isOwner,
  offerType,
  portfolioOffers,
}: DesktopPortfolioOffersProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const { address } = useAccount();

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    count: portfolioOffers.length,
    estimateSize: () => 75, // Estimation of row height for accurate scrollbar dragging
    // Measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" && !navigator.userAgent.includes("Firefox")
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
    scrollMargin: tableRef.current?.offsetTop ?? 0,
  });

  return (
    <>
      <Table ref={tableRef}>
        <TableHeader className="h-12">
          <TableRow
            className={cn(
              "absolute grid w-full items-center",
              gridTemplateColumnValue,
            )}
          >
            <TableHead className="sticky top-0 flex items-center bg-background pl-5">
              Token
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              Price
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              Floor difference
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              {offerType === "made" ? "To" : "From"}
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              Expiration
            </TableHead>
            {isOwner && (
              <TableHead className="sticky top-0 flex items-center bg-background">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody
          className="font-numbers relative text-sm font-medium"
          style={{ height: `${rowVirtualizer.getTotalSize() + 2}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const offer = portfolioOffers[virtualRow.index];

            if (offer === undefined) {
              return null;
            }

            const parsedFloorDifference = parseFloat(
              offer.floor_difference ?? "",
            );

            return (
              <TableRow
                className={cn(
                  "group absolute grid h-[6.25rem] w-full items-center",
                  gridTemplateColumnValue,
                )}
                data-index={virtualRow.index}
                key={`${virtualRow.index}-${offer.hash}-${offer.offer_id}`}
                ref={(node) => rowVirtualizer.measureElement(node)}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TableCell>
                  <div className="flex items-center gap-4 pl-5">
                    <Media
                      className="size-[3.75rem] rounded-xs object-contain"
                      height={120}
                      width={120}
                      alt={offer.metadata?.name ?? "Unnamed Token"}
                      src={offer.metadata?.image ?? ""}
                      mediaKey={offer.metadata?.image_key ?? ""}
                    />
                    <div className="w-full overflow-hidden">
                      <Link
                        className={focusableStyles}
                        href={`/token/${offer.collection_address}/${offer.token_id}`}
                      >
                        <p
                          className={cn(
                            "w-full text-base font-medium",
                            ellipsableStyles,
                          )}
                        >
                          {offer.metadata?.name ?? "Unnamed Token"}
                        </p>
                      </Link>
                      <div className="flex w-full items-center gap-1">
                        <Link
                          className={cn(focusableStyles, ellipsableStyles)}
                          href={`/collection/${offer.collection_address}`}
                        >
                          <p
                            className={cn(
                              "text-muted-foreground transition-colors hover:text-primary",
                              ellipsableStyles,
                            )}
                          >
                            {offer.collection_name}
                          </p>
                        </Link>
                        {offer.is_verified && (
                          <VerifiedIcon className="size-4 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {offer.price ? (
                    <PriceTag price={offer.price} className="max-w-full" />
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      parsedFloorDifference < 0
                        ? "text-red-500"
                        : "text-green-500",
                    )}
                  >
                    {parsedFloorDifference >= 0 && "+"}
                    {offer.floor_difference ?? "0"}%
                  </p>
                </TableCell>
                <TableCell>
                  {offerType === "made" ? (
                    offer.to_address ? (
                      <Link
                        href={`/wallet/${offer.to_address}`}
                        className="text-primary"
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
                      className="text-primary"
                    >
                      {ownerOrShortAddress({
                        ownerAddress: offer.from_address,
                        address,
                      })}
                    </Link>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {offer.expire_at
                    ? getRoundedRemainingTime(offer.expire_at)
                    : "_"}
                </TableCell>
                {isOwner && (
                  <TableCell className="pr-5">
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
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {portfolioOffers.length === 0 && (
        <div className="flex flex-col items-center gap-3 pt-8 text-muted-foreground">
          <NoActivity size={42} />
          <p className="text-xl font-semibold">No offers {offerType} yet!</p>
        </div>
      )}
    </>
  );
}
