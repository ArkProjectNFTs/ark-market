import { useRef } from "react";
import Link from "next/link";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { cn, ellipsableStyles, timeSince } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {  NoResult } from "@ark-market/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { WalletToken } from "../queries/getWalletData";
import { TokenActionsCreateListing } from "~/app/token/[contractAddress]/[tokenId]/components/token-actions-create-listing";
import Media from "~/components/media";
import TokenLastSoldCell from "~/components/cells/token-last-price-cell";
import ActivityTime from "~/components/cells/activity-time-cell";

const gridTemplateColumnValue =
  "grid-cols-[minmax(11rem,2fr)_repeat(4,minmax(10rem,1fr))_minmax(6.5rem,8rem)]";

interface PortfolioItemsDataListViewProps {
  walletTokens: WalletToken[];
  isOwner: boolean;
}

export default function PortfolioItemsDataListView({
  walletTokens,
  isOwner,
}: PortfolioItemsDataListViewProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    count: walletTokens.length,
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
              Item
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              List price
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              Best offer
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              Floor
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background">
              Received date
            </TableHead>
            <TableHead className="sticky top-0 flex items-center bg-background"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          className="font-numbers relative block font-medium"
          style={{
            height: `${rowVirtualizer.getTotalSize() + 2}px`, // Tells scrollbar how big the table is
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const token = walletTokens[virtualRow.index];
            if (token === undefined) {
              return null;
            }
            const canListItem = isOwner && !token.list_price;

            return (
              <TableRow
                className={cn(
                  "group absolute grid h-[4.6875rem] w-full items-center",
                  gridTemplateColumnValue,
                )}
                data-index={virtualRow.index} // Needed for dynamic row height measurement
                key={`${token.collection_address}-${token.token_id}`}
                ref={(node) => rowVirtualizer.measureElement(node)} // Measure dynamic row height
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TableCell className="pl-5">
                  <div className="flex items-center gap-4">
                    <Media
                      alt={token.metadata?.name ?? "Empty NFT"}
                      className="h-[2.625rem] w-[2.625rem] rounded-md object-contain"
                      src={token.metadata?.image}
                      mediaKey={token.metadata?.image_key}
                      height={94}
                      width={94}
                    />

                    <p className={cn("w-full", ellipsableStyles)}>
                      {token.metadata?.name ?? token.token_id}
                    </p>
                  </div>
                </TableCell>
                
                <TokenLastSoldCell price={token.list_price ?? 0} />
            
                <TokenLastSoldCell price={token.best_offer ?? 0} />
                
                <TokenLastSoldCell price={token.floor ?? 0} />

                <TableCell>
                  <p className={ellipsableStyles}>
                    {token.received_at ? timeSince(token.received_at) : "_"}
                  </p>
                </TableCell>
                <ActivityTime time_stamp={token.received_at} />
                <TableCell>
                  {canListItem ? (
                    <TokenActionsCreateListing token={token}>
                      <Button
                        className="w-full opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
                        size="xl"
                      >
                        List for sale
                      </Button>
                    </TokenActionsCreateListing>
                  ) : (
                    <Button
                      className="w-full opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
                      size="xl"
                      asChild
                    >
                      <Link
                        href={`/token/${token.collection_address}/${token.token_id}`}
                      >
                        Details
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {walletTokens.length === 0 && (
        <div className="flex flex-col items-center gap-3 pt-8 text-muted-foreground">
          <NoResult size={42} />
          <p className="text-xl font-semibold">No items yet!</p>
        </div>
      )}
    </>
  );
}
