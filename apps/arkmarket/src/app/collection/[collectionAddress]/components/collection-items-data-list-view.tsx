"use client";

import { useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { CollectionToken } from "~/types";
import TokenInfosCell from "~/components/cells/token-infos-cell";
import TokenLastSoldCell from "~/components/cells/token-last-price-cell";
import TokenOwnerCell from "~/components/cells/token-owner-cell";
import TokenPriceCell from "~/components/cells/token-price-cell";
import TokenTimeListedCell from "~/components/cells/token-time-listed-cell";

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
              <TokenInfosCell token={token} />

              {/* price */}
              <TokenPriceCell token={token} />

              {/* last sold */}
              <TokenLastSoldCell price={token.last_price} />

              {/* floor difference */}
              <TableCell className="flex w-[15%]">_</TableCell>

              {/* owner */}
              <TokenOwnerCell token={token} />

              {/* time listed */}
              <TokenTimeListedCell token={token} />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
