import {
  ArrowLeftRight,
  CircleDot,
  Gavel,
  List,
  ListX,
  Meh,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { shortAddress, timeSince } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { TokenActivity } from "../queries/getTokenData";

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
]);

interface DesktopTokenActivityProps {
  tokenActivity: TokenActivity[];
}

export default function DesktopTokenActivity({
  className,
  tokenActivity,
}: PropsWithClassName<DesktopTokenActivityProps>) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow className="hover:bg-background">
          <TableHead className="pl-5">Event</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className="text-end">Date</TableHead>
        </TableRow>
      </TableHeader>
      {tokenActivity.length === 0 ? (
        <TableBody className="table-caption">
          <div className="flex flex-col items-center gap-3 pt-10 text-muted-foreground">
            <Meh size={42} />
            <p className="text-xl font-semibold">No activity yet!</p>
          </div>
        </TableBody>
      ) : (
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
                <TableCell className="text-end">
                  {timeSince(activity.time_stamp)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
}
