"use client";

import { useRef } from "react";
import { useAccount } from "@starknet-react/core";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { cn } from "@ark-market/ui";
import { NoActivity } from "@ark-market/ui/icons";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { PortfolioActivity, TokenMetadata } from "~/types";
import EventCell from "~/components/cells/activity-event-cell";
import ActivityToFromCell from "~/components/cells/activity-from-cell";
import PriceCell from "~/components/cells/activity-price-cell";
import ActivityTime from "~/components/cells/activity-time-cell";
import TokenCell from "~/components/cells/activity-token-cell";
import ActivityUp from "~/components/cells/activity-transaction-cell";

const gridTemplateColumnValue =
  "grid-cols-[minmax(14rem,1fr)_minmax(15rem,2fr)_repeat(4,minmax(11rem,1fr))_minmax(4.5rem,4.5rem)]";

interface DesktopPortfolioActivityProps {
  portfolioActivity: PortfolioActivity[];
}

export default function DesktopPortfolioActivity({
  portfolioActivity,
}: DesktopPortfolioActivityProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const { address } = useAccount();

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
          className="font-numbers relative block text-sm font-medium"
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
                <EventCell activity={activity} />

                <TokenCell
                  address={activity.collection_address}
                  collectionAddress={activity.collection_address}
                  isVerified={activity.collection_is_verified}
                  metadata={activity.metadata as TokenMetadata | null}
                  name={activity.collection_name}
                  tokenId={activity.token_id}
                />

                <PriceCell activity={activity} />

                <ActivityToFromCell
                  ownerAddress={activity.from}
                  address={address}
                />

                <ActivityToFromCell
                  ownerAddress={activity.to}
                  address={address}
                />

                <ActivityTime timeStamp={activity.time_stamp} />

                <ActivityUp transactionHash={activity.transaction_hash} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {portfolioActivity.length === 0 && (
        <div className="flex flex-col items-center gap-3 pt-8 text-muted-foreground">
          <NoActivity size={42} />
          <p className="text-xl font-semibold">No activity yet!</p>
        </div>
      )}
    </>
  );
}
