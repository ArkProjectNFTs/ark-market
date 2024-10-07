import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TableVirtuoso } from "react-virtuoso";
import { formatEther } from "viem";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionStats,
} from "~/types";
import Media from "../media";

function SortButton({
  isActive,
  label,
  sortBy,
  sortDirection,
  onChange,
}: {
  isActive: boolean;
  label?: string;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  onChange: (by: CollectionSortBy, direction: CollectionSortDirection) => void;
}) {
  return (
    <Button
      variant="unstyled"
      className="p-0"
      onClick={() =>
        onChange(
          sortBy,
          isActive ? (sortDirection === "asc" ? "desc" : "asc") : "desc",
        )
      }
    >
      {label ?? sortBy}
      <div className="flex flex-col">
        <ChevronUp
          className={cn(
            "-mb-1 size-3",
            isActive && sortDirection === "asc" && "text-primary",
          )}
        />
        <ChevronDown
          className={cn(
            "-mb-1 size-3",
            isActive && sortDirection === "desc" && "text-primary",
          )}
        />
      </div>
    </Button>
  );
}

interface CollectionsListProps {
  items: CollectionStats[];
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  onSortChange: (
    sortBy: CollectionSortBy,
    sortDirection: CollectionSortDirection,
  ) => void;
}

export default function CollectionsList({
  items,
  sortBy,
  sortDirection,
  onSortChange,
}: CollectionsListProps) {
  return (
    <TableVirtuoso
      data={items}
      className="mb-12 min-w-[1024px]"
      useWindowScroll
      totalCount={items.length}
      overscan={10}
      initialTopMostItemIndex={0}
      components={{
        Table,
        // Table: forwardRef((props, ref) => (
        //   <Table {...props} ref={ref} className="table-auto" />
        // )),
        TableBody,
        TableHead: (props) => <TableHeader {...props} className="sticky" />,
        TableRow,
      }}
      fixedHeaderContent={() => (
        <TableRow>
          <TableHead className="sticky w-[250px] pl-6">Name</TableHead>
          <TableHead className="w-[100px] text-right">
            <SortButton
              onChange={onSortChange}
              sortBy="floor_price"
              sortDirection={sortDirection}
              isActive={sortBy === "floor_price"}
              label="Floor"
            />
          </TableHead>
          <TableHead className="text-right">
            <SortButton
              onChange={onSortChange}
              sortBy="volume"
              sortDirection={sortDirection}
              isActive={sortBy === "volume"}
              label="Volume"
            />
          </TableHead>
          <TableHead className="text-right">
            <SortButton
              onChange={onSortChange}
              sortBy="marketcap"
              sortDirection={sortDirection}
              isActive={sortBy === "marketcap"}
              label="Marketcap"
            />
          </TableHead>
          <TableHead className="text-right">
            <SortButton
              onChange={onSortChange}
              sortBy="floor_percentage"
              sortDirection={sortDirection}
              isActive={sortBy === "floor_percentage"}
              label="Floor %"
            />
          </TableHead>
          <TableHead className="text-right">
            <SortButton
              onChange={onSortChange}
              sortBy="top_bid"
              sortDirection={sortDirection}
              isActive={sortBy === "top_bid"}
              label="Top Bid"
            />
          </TableHead>
          <TableHead className="text-right">
            <SortButton
              onChange={onSortChange}
              sortBy="number_of_sales"
              sortDirection={sortDirection}
              isActive={sortBy === "number_of_sales"}
              label="Sales"
            />
          </TableHead>
          <TableHead className="pr-6 text-right">
            <SortButton
              onChange={onSortChange}
              sortBy="listed"
              sortDirection={sortDirection}
              isActive={sortBy === "listed"}
              label="Listed"
            />
          </TableHead>
        </TableRow>
      )}
      itemContent={(_, item) => (
        <>
          <TableCell className="flex w-[250px] items-center gap-10 pl-6">
            <Link
              href={`/collection/${item.address}`}
              className="flex w-full items-center gap-4"
            >
              <Media
                className="size-[60px] rounded-xs"
                height={120}
                width={120}
                alt={item.name}
                src={item.image}
                // mediaKey={item.image}
              />
              <div className="truncate text-primary">{item.name}</div>
            </Link>
          </TableCell>
          <TableCell className="sticky text-right">
            {item.floor ? (
              <>
                {formatEther(BigInt(item.floor))}
                <span className="text-muted-foreground"> ETH</span>
              </>
            ) : (
              "--"
            )}
          </TableCell>
          <TableCell className="text-right">
            {item.volume ? (
              <>
                {formatEther(BigInt(item.volume))}
                <span className="text-muted-foreground"> ETH</span>
              </>
            ) : (
              "--"
            )}
          </TableCell>
          <TableCell className="text-right">
            {item.marketcap ? (
              <>
                {formatEther(BigInt(item.marketcap))}
                <span className="text-muted-foreground"> ETH</span>
              </>
            ) : (
              "--"
            )}
          </TableCell>
          <TableCell className="text-right">
            {item.floor_percentage} %
          </TableCell>
          <TableCell className="text-right">
            {item.top_offer ? (
              <>
                {formatEther(BigInt(item.top_offer))}
                <span className="text-muted-foreground"> ETH</span>
              </>
            ) : (
              "--"
            )}
          </TableCell>
          <TableCell className="text-right">{item.sales}</TableCell>
          <TableCell className="pr-6 text-right">{item.listed_items}</TableCell>
        </>
      )}
    />
  );
}
