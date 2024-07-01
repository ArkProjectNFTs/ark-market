"use client";

import { useRef } from "react";
import Link from "next/link";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { cn, ellipsableStyles, formatUnits } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { CollectionToken } from "../queries/getCollectionData";
import Media from "~/components/media";

const gridTemplateColumnValue =
  "grid-cols-[minmax(10rem,2fr)_repeat(5,minmax(7.25rem,1fr))]";

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
    <Table ref={tableRef}>
      <TableHeader>
        <TableRow className={cn("grid items-center", gridTemplateColumnValue)}>
          <TableHead className="sticky top-0 flex items-center bg-background pl-5">
            Item
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Current price
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Last sold
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Floor difference
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Owner
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Time listed
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody
        className="relative"
        style={{
          height: `${rowVirtualizer.getTotalSize() + 2}px`, // Tells scrollbar how big the table is
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const token = collectionTokens[virtualRow.index];
          if (token === undefined) {
            return null;
          }

          return (
            <Link
              prefetch={false}
              href={`/token/${token.contract}/${token.token_id}`}
              key={`${token.contract}-${token.token_id}`}
            >
              <TableRow
                data-index={virtualRow.index} // Needed for dynamic row height measurement
                ref={(node) => rowVirtualizer.measureElement(node)} // Measure dynamic row height
                className={cn(
                  "absolute grid h-[4.6875rem] w-full items-center",
                  gridTemplateColumnValue,
                )}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TableCell className="pl-5">
                  <div className="flex items-center gap-4">
                    <Media
                      src={token.metadata?.image}
                      mediaKey={token.metadata?.image_key}
                      alt={token.metadata?.name ?? "Empty NFT"}
                      className="h-[2.625rem] w-[2.625rem] rounded-md object-contain"
                      height={94}
                      width={94}
                    />
                    <p className={cn("w-full font-semibold", ellipsableStyles)}>
                      {token.metadata?.name ?? token.token_id}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {token.price === null
                    ? "_"
                    : `${formatUnits(token.price, 18)} ETH`}
                </TableCell>
                <TableCell>_</TableCell>
                <TableCell>_</TableCell>
                <TableCell>
                  <Button asChild variant="link" className="px-0">
                    <Link href={`/wallet/${token.owner}`}>
                      {token.owner !== null
                        ? `${token.owner.slice(0, 6)}...`
                        : "_"}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>_</TableCell>
              </TableRow>
            </Link>
          );
        })}
      </TableBody>
    </Table>
  );
}
