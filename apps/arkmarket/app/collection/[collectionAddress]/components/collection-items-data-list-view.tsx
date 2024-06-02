"use client";

import { useCallback, useEffect, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/components/table";

import type { CollectionToken } from "../queries/getCollectionData";

interface CollectionItemsDataListViewProps {
  collectionTokens: CollectionToken[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

export default function CollectionItemsDataListView({
  collectionTokens,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CollectionItemsDataListViewProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);

  // TODO @YohanTz: Extract to custom hook
  const fetchMoreOnBottomReached = useCallback(() => {
    if (document.body) {
      const { scrollHeight } = window.document.body;
      // Once the user has scrolled within 500px of the bottom of the window, fetch more data if possible
      if (
        scrollHeight - window.scrollY - window.innerHeight < 500 &&
        !isFetchingNextPage &&
        hasNextPage
      ) {
        void fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // TODO @YohanTz: Replace with framer-motion
  // A check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached();

    window.addEventListener("scroll", fetchMoreOnBottomReached);
    return () => {
      window.removeEventListener("scroll", fetchMoreOnBottomReached);
    };
  }, [fetchMoreOnBottomReached]);

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    count: collectionTokens?.length ?? 0,
    estimateSize: () => 75, // Estimation of row height for accurate scrollbar dragging
    // Measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
    scrollMargin: tableRef.current?.offsetTop ?? 0,
  });

  return (
    <Table ref={tableRef}>
      <TableHeader>
        <TableRow className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] items-center">
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
          height: `${rowVirtualizer.getTotalSize()}px`, // Tells scrollbar how big the table is
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const token = collectionTokens[virtualRow.index];
          if (token === undefined) {
            return null;
          }

          return (
            <TableRow
              key={`${token.contract}-${token.token_id}`}
              data-index={virtualRow.index} // Needed for dynamic row height measurement
              ref={(node) => rowVirtualizer.measureElement(node)} // Measure dynamic row height
              className="absolute grid h-[4.6875rem] w-full grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] items-center"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <TableCell className="pl-5">
                <div className="flex items-center gap-4">
                  <div className="h-[2.625rem] w-[2.625rem] rounded-md bg-secondary" />
                  <p>#{token.token_id}</p>
                </div>
              </TableCell>
              <TableCell>{token.price ?? "_"}</TableCell>
              <TableCell>_</TableCell>
              <TableCell>_</TableCell>
              <TableCell>{token.owner.slice(0, 6)}...</TableCell>
              <TableCell>_</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
