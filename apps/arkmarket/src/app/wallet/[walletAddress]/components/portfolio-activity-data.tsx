"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import {
  ArrowLeftRight,
  ArrowUpRight,
  CircleDot,
  Flame,
  Gavel,
  List,
  ListX,
  Meh,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";

import { cn, ellipsableStyles, formatUnits, timeSince } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { PortfolioActivityApiResponse } from "~/lib/getPortfolioActivity";
import ExternalLink from "~/components/external-link";
import Media from "~/components/media";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getPortfolioActivity } from "~/lib/getPortfolioActivity";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface PortfolioActivityDataProps {
  walletAddress: string;
}

export const activityTypeToItem = new Map([
  ["FULFILL", { icon: <ShoppingCart size={24} />, title: "Sale in progress" }],
  ["EXECUTED", { icon: <ShoppingCart size={24} />, title: "Sale" }],
  ["SALE", { icon: <ShoppingCart size={24} />, title: "Sale" }],
  ["TRANSFER", { icon: <ArrowLeftRight size={24} />, title: "Transfer" }],
  ["LISTING", { icon: <List size={24} />, title: "List" }],
  ["OFFER", { icon: <Tag size={24} />, title: "Offer" }],
  ["CANCELLED", { icon: <X size={24} />, title: "Cancel Offer" }],
  ["MINT", { icon: <CircleDot size={24} />, title: "Mint" }],
  ["AUCTION", { icon: <Gavel size={24} />, title: "Put in auction" }],
  ["DELISTING", { icon: <ListX size={24} />, title: "Delist" }],
  ["BURN", { icon: <Flame size={24} />, title: "Burn" }],
]);

const gridTemplateColumnValue =
  "grid-cols-[minmax(7rem,1fr)_minmax(11rem,2fr)_repeat(4,minmax(7.5rem,1fr))_minmax(4.5rem,4.5rem)]";

export default function PortfolioActivityData({
  walletAddress,
}: PortfolioActivityDataProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const { address } = useAccount();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletActivity", walletAddress],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: PortfolioActivityApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPortfolioActivity({
        page: pageParam,
        walletAddress,
      }),
  });

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const portfolioActivity = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    count: portfolioActivity.length,
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
            Event
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Token
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Price
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            From
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            To
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background">
            Date
          </TableHead>
          <TableHead className="sticky top-0 flex items-center bg-background"></TableHead>
        </TableRow>
      </TableHeader>
      {portfolioActivity.length === 0 ? (
        <TableBody className="table-caption">
          <div className="flex flex-col items-center gap-3 pt-10 text-muted-foreground">
            <Meh size={42} />
            <p className="text-xl font-semibold">No activity yet!</p>
          </div>
        </TableBody>
      ) : (
        <TableBody
          className="relative text-sm font-semibold"
          style={{ height: `${rowVirtualizer.getTotalSize() + 2}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const activity = portfolioActivity[virtualRow.index];
            if (activity === undefined) {
              return null;
            }
            const activityItem = activityTypeToItem.get(activity.activity_type);

            return (
              <TableRow
                className={cn(
                  "group absolute grid h-[6.25rem] w-full items-center",
                  gridTemplateColumnValue,
                )}
                data-index={virtualRow.index}
                key={`${virtualRow.index}-${activity.time_stamp}-${activity.transaction_hash}`}
                ref={(node) => rowVirtualizer.measureElement(node)}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TableCell className="items-center gap-4 whitespace-nowrap pl-5">
                  <div className="flex items-center gap-4 whitespace-nowrap">
                    {activityItem?.icon}
                    <p>{activityItem?.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Media
                      alt={activity.metadata.name}
                      className="size-[3.75rem] rounded-xs object-contain"
                      height={120}
                      width={120}
                      src={activity.metadata.image}
                      mediaKey={activity.metadata.image_key}
                    />

                    <div className="w-full overflow-hidden">
                      <p
                        className={cn(
                          "w-full text-base font-medium",
                          ellipsableStyles,
                        )}
                      >
                        {activity.metadata.name}
                      </p>
                      <div className="flex w-full items-center gap-1">
                        <p
                          className={cn(
                            "text-muted-foreground",
                            ellipsableStyles,
                          )}
                        >
                          {activity.collection_name}
                        </p>
                        {activity.collection_is_verified && (
                          <VerifiedIcon className="size-4 text-background" />
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {activity.price ? (
                    <div className="flex items-center">
                      <EthereumLogo2 className="size-4" />
                      <p className="font-semibold">
                        {formatUnits(activity.price, 18)}{" "}
                        <span className="text-muted-foreground">ETH</span>
                      </p>
                    </div>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {activity.from ? (
                    <Link href={`/wallet/${activity.from}`}>
                      {ownerOrShortAddress({
                        ownerAddress: activity.from,
                        address,
                      })}
                    </Link>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {activity.to ? (
                    <Link href={`/wallet/${activity.to}`}>
                      {ownerOrShortAddress({
                        ownerAddress: activity.to,
                        address,
                      })}
                    </Link>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {activity.time_stamp ? timeSince(activity.time_stamp) : "_"}
                </TableCell>
                <TableCell className="pr-5">
                  <Button asChild size="icon" variant="outline">
                    <ExternalLink
                      href={`https://starkscan.co/tx/${activity.transaction_hash}`}
                    >
                      <ArrowUpRight className="size-5" />
                    </ExternalLink>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
}
