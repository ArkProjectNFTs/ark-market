"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/components/table";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";
import type { CollectionTokensApiResponse } from "../queries/getCollectionData";
import { getCollectionTokens } from "../queries/getCollectionData";

interface CollectionItemsDataProps {
  collectionAddress: string;
  collectionTokensInitialData: CollectionTokensApiResponse;
  sortDirection: CollectionSortDirection;
  sortBy: CollectionSortBy;
}
export default function CollectionItemsData({
  collectionAddress,
  collectionTokensInitialData,
  sortDirection,
  sortBy,
}: CollectionItemsDataProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    // TODO @YohanTz: add sorting states to query key
    queryKey: ["collectionTokens"],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialData: {
      pages: [collectionTokensInitialData],
      pageParams: [],
    },
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
      }),
  });

  const flatData = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data),
    [infiniteData],
  );

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
    count: flatData?.length ?? 0,
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

  if (flatData === undefined) {
    // no-op
    return null;
  }

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
          const token = flatData[virtualRow.index];
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
