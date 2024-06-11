import { useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { Button } from "@ark-market/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/components/table";

import type { WalletToken } from "../queries/getWalletData";
import Media from "~/components/media";

interface PortfolioItemsDataListViewProps {
  walletTokens: WalletToken[];
}

export default function PortfolioItemsDataListView({
  walletTokens,
}: PortfolioItemsDataListViewProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    count: walletTokens?.length ?? 0,
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
        className="relative"
        style={{
          height: `${rowVirtualizer.getTotalSize() + 2}px`, // Tells scrollbar how big the table is
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const token = walletTokens[virtualRow.index];
          if (token === undefined) {
            return null;
          }

          return (
            <TableRow
              key={`${token.contract}-${token.token_id}`}
              data-index={virtualRow.index} // Needed for dynamic row height measurement
              ref={(node) => rowVirtualizer.measureElement(node)} // Measure dynamic row height
              className="group absolute grid h-[4.6875rem] w-full grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] items-center"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <TableCell className="pl-5">
                <div className="flex items-center gap-4">
                  <Media
                    src={token.metadata?.image}
                    alt={token.metadata?.name ?? "Empty NFT"}
                    className="h-[2.625rem] w-[2.625rem] rounded-md"
                  />
                  <p className="font-semibold">
                    {token.metadata?.name ?? token.token_id}
                  </p>
                </div>
              </TableCell>
              <TableCell>{token.list_price ?? "_"}</TableCell>
              <TableCell>{token.best_offer ?? "_"}</TableCell>
              <TableCell>{token.floor ?? "_"}</TableCell>
              <TableCell>{token.received_at ?? "_"}</TableCell>
              <TableCell>
                {/* TODO @YohanTz: List button only if owner is connected */}
                <Button className="w-full opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100">
                  List for sale
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
