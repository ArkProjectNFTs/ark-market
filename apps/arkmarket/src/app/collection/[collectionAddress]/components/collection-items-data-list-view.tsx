"use client";

import { useRef } from "react";
import Link from "next/link";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import {
  cn,
  ellipsableStyles,
  formatUnits,
  timeSinceShort,
} from "@ark-market/ui";
import { Ethereum, LoaderCircle } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { CollectionToken } from "~/types";
import Media from "~/components/media";

interface CollectionItemsDataListViewProps {
  collectionTokens: CollectionToken[];
}

export default function CollectionItemsDataListView({
  collectionTokens,
}: CollectionItemsDataListViewProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    count: collectionTokens.length ?? 0,
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
    <Table ref={tableRef} className="w-full min-w-[1024px] table-auto">
      <TableHeader className="sticky top-0 h-10 bg-green-500/20">
        <TableRow className="flex">
          <TableHead className="sticky left-0 top-0 flex min-w-[240px] flex-grow items-center bg-background pl-5">
            Item
          </TableHead>
          <TableHead className="flex w-[25%] items-center bg-background">
            Current price
          </TableHead>
          <TableHead className="flex w-[20%] items-center bg-background">
            Last sold
          </TableHead>
          <TableHead className="flex w-[15%] items-center bg-background">
            Floor difference
          </TableHead>
          <TableHead className="flex w-[10%] items-center bg-background">
            Owner
          </TableHead>
          <TableHead className="flex w-[10%] items-center bg-background">
            Time listed
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody
        className="font-numbers relative block font-medium"
        style={{
          height: `${rowVirtualizer.getTotalSize() + 2}px`, // Tells scrollbar how big the table is
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const token = collectionTokens[virtualRow.index];

          if (!token) {
            return null;
          }

          return (
            <TableRow
              data-index={virtualRow.index}
              key={`${token.collection_address}-${token.token_id}`}
              ref={(node) => rowVirtualizer.measureElement(node)}
              className="group absolute flex w-full items-center"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {/* avatar / name */}
              <TableCell className="sticky left-0 min-w-[240px] flex-grow pl-5 backdrop-blur-3xl transition-colors">
                <Link
                  prefetch={false}
                  href={`/token/${token.collection_address}/${token.token_id}`}
                  className="flex items-center gap-4"
                >
                  <Media
                    src={token.metadata?.image}
                    mediaKey={token.metadata?.image_key}
                    alt={token.metadata?.name ?? "Empty NFT"}
                    className="size-10 rounded-md object-contain"
                  />
                  <div className={cn("w-full", ellipsableStyles)}>
                    {token.metadata?.name ?? token.token_id}
                  </div>
                </Link>
              </TableCell>

              {/* price */}
              <TableCell className="flex w-[25%]">
                {token.buy_in_progress ? (
                  <div className="flex h-10 items-center justify-center text-nowrap rounded bg-primary px-3 text-sm text-background">
                    Buy in progress
                    <LoaderCircle className="ml-4 size-4 animate-spin" />
                  </div>
                ) : token.price ? (
                  <PriceTag price={token.price} />
                ) : (
                  "_"
                )}
              </TableCell>

              {/* last sold */}
              <TableCell className="flex w-[20%]">
                {token.last_price ? (
                  <div className="flex items-center">
                    <Ethereum className="size-4" />
                    <p>
                      {formatUnits(token.last_price, 18)}{" "}
                      <span className="text-muted-foreground">ETH</span>
                    </p>
                  </div>
                ) : (
                  "_"
                )}
              </TableCell>

              {/* floor difference */}
              <TableCell className="flex w-[15%]">_</TableCell>

              {/* owner */}
              <TableCell className="flex w-[10%] whitespace-nowrap">
                <Link
                  href={`/wallet/${token.owner}`}
                  className="hover:text-primary"
                >
                  {token.owner ? token.owner.slice(0, 6) : "_"}
                </Link>
              </TableCell>

              {/* time listed */}
              <TableCell className="flex w-[10%] whitespace-nowrap">
                {token.listed_at ? timeSinceShort(token.listed_at) : "_"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
