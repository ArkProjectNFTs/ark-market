"use client";

import { useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import {
  ArrowLeftRight,
  List,
  ListX,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, shortAddress, timeSince } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { TokenActivityApiResponse } from "../queries/getTokenData";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getTokenActivity } from "../queries/getTokenData";

const activityTypeToItem = new Map([
  ["FULFILL", { icon: <ShoppingCart size={24} />, title: "Sale" }],
  ["TRANSFER", { icon: <ArrowLeftRight size={24} />, title: "Transfer" }],
  ["LISTING", { icon: <List size={24} />, title: "List" }],
  ["OFFER", { icon: <Tag size={24} />, title: "Offer" }],
  ["CANCELLED", { icon: <X size={24} />, title: "Cancel Offer" }],
  ["delist", { icon: <ListX size={24} />, title: "Delist" }],
]);

interface TokenActivityProps {
  contractAddress: string;
  tokenId: string;
}

export default function TokenActivity({
  className,
  contractAddress,
  tokenId,
}: PropsWithClassName<TokenActivityProps>) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tokenActivity", contractAddress, tokenId],
    refetchInterval: 10_000,
    // getNextPageParam: (lastPage) => lastPage.next_page,
    getNextPageParam: (lastPage?: TokenActivityApiResponse) =>
      lastPage?.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getTokenActivity({ contractAddress, tokenId, page: pageParam }),
  });

  const totalCount = infiniteData?.pages[0]?.count ?? 0;
  const tokenActivity = useMemo(
    () => infiniteData?.pages.flatMap((page) => page?.data ?? []) ?? [],
    [infiniteData],
  );

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // const rowVirtualizer = useWindowVirtualizer({
  //   // Approximate initial rect for SSR
  //   initialRect: { height: 1080, width: 1920 },
  //   count: tokenActivity.length,
  //   estimateSize: () => 75, // Estimation of row height for accurate scrollbar dragging
  //   // Measure dynamic row height, except in firefox because it measures table border height incorrectly
  //   measureElement:
  //     typeof window !== "undefined" && !navigator.userAgent.includes("Firefox")
  //       ? (element) => element.getBoundingClientRect().height
  //       : undefined,
  //   overscan: 5,
  //   scrollMargin: tableRef.current?.offsetTop ?? 0,
  // });

  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-1.5">
        <h2 className="text-2xl font-semibold">Activity</h2>
        <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm font-medium text-secondary-foreground">
          {totalCount}
        </div>
      </div>

      <Table className="mt-12" ref={tableRef}>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead className="pl-5">Event</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-semibold">
          {tokenActivity.map((activity, index) => {
            const activityItem = activityTypeToItem.get(activity.activity_type);
            return (
              <TableRow className="group h-[4.6875rem]" key={index}>
                <TableCell className="pl-5 transition-colors group-hover:text-muted-foreground">
                  <div className="flex items-center gap-4 whitespace-nowrap">
                    {activityItem?.icon}
                    <p>{activityItem?.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {activity.price !== null ? (
                    <PriceTag price={activity.price} />
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {activity.from ? shortAddress(activity.from) : "_"}
                </TableCell>
                <TableCell>
                  {activity.to ? shortAddress(activity.to) : "_"}
                </TableCell>
                <TableCell>{timeSince(activity.time_stamp)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
