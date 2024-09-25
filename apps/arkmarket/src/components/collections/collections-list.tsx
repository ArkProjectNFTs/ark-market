import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatEther } from "viem";

import { cn } from "@ark-market/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@ark-market/ui/avatar";
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
  items: CollectionStats[] | null | undefined;
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
    <div className="min-h-[800px]">
      <Table className="pb-10">
        <TableHeader className="">
          <TableRow className="">
            <TableHead className="sticky w-[250px] pl-6">Name</TableHead>
            <TableHead className="">
              <SortButton
                onChange={onSortChange}
                sortBy="floor_price"
                sortDirection={sortDirection}
                isActive={sortBy === "floor_price"}
                label="Floor"
              />
            </TableHead>
            <TableHead className="">
              <SortButton
                onChange={onSortChange}
                sortBy="volume"
                sortDirection={sortDirection}
                isActive={sortBy === "volume"}
                label="Volume"
              />
            </TableHead>
            <TableHead className="">
              <SortButton
                onChange={onSortChange}
                sortBy="marketcap"
                sortDirection={sortDirection}
                isActive={sortBy === "marketcap"}
                label="Marketcap"
              />
            </TableHead>
            <TableHead className="">
              <SortButton
                onChange={onSortChange}
                sortBy="floor_percentage"
                sortDirection={sortDirection}
                isActive={sortBy === "floor_percentage"}
                label="Floor %"
              />
            </TableHead>
            <TableHead className="">
              <SortButton
                onChange={onSortChange}
                sortBy="top_bid"
                sortDirection={sortDirection}
                isActive={sortBy === "top_bid"}
                label="Top Bid"
              />
            </TableHead>
            <TableHead className="">
              <SortButton
                onChange={onSortChange}
                sortBy="number_of_sales"
                sortDirection={sortDirection}
                isActive={sortBy === "number_of_sales"}
                label="Sales"
              />
            </TableHead>
            <TableHead className="">Listed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-numbers">
          {items?.map((item) => (
            <TableRow key={item.address} className="">
              <TableCell className="flex w-[200px] items-center gap-2 pl-6">
                <Link
                  href={`/collection/${item.address}`}
                  className="flex items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage src={item.image} />
                    <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="text-primary">{item.name}</div>
                </Link>
              </TableCell>
              <TableCell className="sticky">
                {formatEther(BigInt(item.floor))}{" "}
                <span className="text-muted-foreground">ETH</span>
              </TableCell>
              <TableCell>
                {item.marketcap.toLocaleString()}{" "}
                <span className="text-muted-foreground">ETH</span>
              </TableCell>
              <TableCell>{item.floor_percentage}%</TableCell>
              <TableCell>
                {item.top_offer}{" "}
                <span className="text-muted-foreground">ETH</span>
              </TableCell>
              <TableCell>
                {item.volume} <span className="text-muted-foreground">ETH</span>
              </TableCell>
              <TableCell>{item.sales}</TableCell>
              <TableCell>{item.listed_items}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
