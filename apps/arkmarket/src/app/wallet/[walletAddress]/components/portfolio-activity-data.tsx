"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  timeSince,
} from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { ArrowUpRight, VerifiedIcon } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
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
import activityTypeMetadata from "~/constants/activity-type-metadata";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getPortfolioActivity } from "~/lib/getPortfolioActivity";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface PortfolioActivityDataProps {
  walletAddress: string;
}

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
      <TableHeader className="h-12">
        <TableRow
          className={cn(
            "absolute grid w-full items-center",
            gridTemplateColumnValue,
          )}
        >
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
      <TableBody
        className="font-numbers relative text-sm font-medium"
        style={{ height: `${rowVirtualizer.getTotalSize() + 2}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const activity = portfolioActivity[virtualRow.index];

          if (activity === undefined) {
            return null;
          }

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
                  {activityTypeMetadata[activity.activity_type].icon}
                  <p>{activityTypeMetadata[activity.activity_type].title}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Media
                    className="size-[3.75rem] rounded-xs object-contain"
                    height={120}
                    width={120}
                    alt={activity.metadata?.name ?? "Unnamed Token"}
                    src={activity.metadata?.image ?? ""}
                    mediaKey={activity.metadata?.image_key ?? ""}
                  />
                  <div className="w-full overflow-hidden">
                    <Link
                      className={focusableStyles}
                      href={`/token/${activity.collection_address}/${activity.token_id}`}
                    >
                      <p
                        className={cn(
                          "w-full text-base font-medium",
                          ellipsableStyles,
                        )}
                      >
                        {activity.metadata?.name ?? "Unnamed Token"}
                      </p>
                    </Link>
                    <div className="flex w-full items-center gap-1">
                      <Link
                        className={focusableStyles}
                        href={`/collection/${activity.collection_address}`}
                      >
                        <p
                          className={cn(
                            "text-muted-foreground",
                            ellipsableStyles,
                          )}
                        >
                          {activity.collection_name}
                        </p>
                      </Link>
                      {activity.collection_is_verified && (
                        <VerifiedIcon className="size-4 text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {activity.price ? <PriceTag price={activity.price} /> : "_"}
              </TableCell>
              <TableCell>
                {activity.from ? (
                  <Link
                    href={`/wallet/${activity.from}`}
                    className="text-primary"
                  >
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
                  <Link
                    href={`/wallet/${activity.to}`}
                    className="text-primary"
                  >
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
                  <ExternalLink href="/">
                    <ArrowUpRight className="size-5" />
                  </ExternalLink>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
