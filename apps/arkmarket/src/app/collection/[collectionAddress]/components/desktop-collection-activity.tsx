"use client";

import { useRef } from "react";
import { useAccount } from "@starknet-react/core";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { cn } from "@ark-market/ui";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { CollectionActivity } from "~/types";
import EventCell from "~/components/cells/activity-event-cell";
import ActivityToFromCell from "~/components/cells/activity-from-cell";
import PriceCell from "~/components/cells/activity-price-cell";
import ActivityTime from "~/components/cells/activity-time-cell";
import TokenCell from "~/components/cells/activity-token-cell";
import ActivityUp from "~/components/cells/activity-up-cell";

interface DesktopCollectionActivityProps {
  collectionAddress: string;
  collectionActivity: CollectionActivity[];
}

const gridTemplateColumnValue =
  "grid-cols-[minmax(14rem,1fr)_minmax(15rem,2fr)_repeat(4,minmax(11rem,1fr))_minmax(4.5rem,4.5rem)]";

export default function DesktopCollectionActivity({
  collectionAddress,
  collectionActivity,
}: DesktopCollectionActivityProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const { address } = useAccount();

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    count: collectionActivity.length,
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
        className="font-numbers relative block text-sm font-medium"
        style={{ height: `${rowVirtualizer.getTotalSize() + 2}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const activity = collectionActivity[virtualRow.index];
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
                address={activity.address}
                isVerified={activity.is_verified}
                metadata={activity.token_metadata}
                name={activity.name}
                tokenId={activity.token_id}
                collectionAddress={collectionAddress}
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

              <ActivityUp />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
