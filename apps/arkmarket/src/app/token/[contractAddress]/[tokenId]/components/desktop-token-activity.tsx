import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import type { PropsWithClassName } from "@ark-market/ui";
import { timeSince } from "@ark-market/ui";
import {
  ActivityCancelOffer,
  ActivityDelist,
  ActivityList,
  ActivityOffer,
  ArrowLeftRight,
  CircleDot,
  Flame,
  Gavel,
  NoActivity,
  ShoppingCart,
  TimerReset
} from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { TokenActivity } from "~/types";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

export const activityTypeToItem = new Map([
  ["FULFILL", { icon: <ShoppingCart size={16} />, title: "Sale in progress" }],
  ["EXECUTED", { icon: <ShoppingCart size={16} />, title: "Sale" }],
  ["SALE", { icon: <ShoppingCart size={16} />, title: "Sale" }],
  ["TRANSFER", { icon: <ArrowLeftRight size={16} />, title: "Transfer" }],
  ["LISTING", { icon: <ActivityList size={16} />, title: "List" }],
  ["OFFER", { icon: <ActivityOffer size={16} />, title: "Offer" }],
  [
    "CANCELLED",
    { icon: <ActivityCancelOffer size={16} />, title: "Cancel Offer" },
  ],
  ["MINT", { icon: <CircleDot size={16} />, title: "Mint" }],
  ["AUCTION", { icon: <Gavel size={16} />, title: "Put in auction" }],
  ["DELISTING", { icon: <ActivityDelist size={16} />, title: "Delist" }],
  ["BURN", { icon: <Flame size={16} />, title: "Burn" }],
  ["BURN", { icon: <Flame size={16} />, title: "Burn" }],
  ["CANCEL_AUCTION", { icon: <Gavel size={16} />, title: "Put in auction" }],
  ["CANCELLED", { icon: <ActivityDelist size={16} />, title: "Delist" }],
  [
    "CANCEL_OFFER",
    { icon: <ActivityCancelOffer size={16} />, title: "Cancel Offer" },
  ],
  ["EXPIRED_OFFER", { icon: <TimerReset size={16} />, title: "Expired Offer" }],
]);

interface DesktopTokenActivityProps {
  tokenActivity: TokenActivity[];
}

export default function DesktopTokenActivity({
  className,
  tokenActivity,
}: PropsWithClassName<DesktopTokenActivityProps>) {
  const { address } = useAccount();

  return (
    <>
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
        <TableBody className="font-numbers text-sm font-medium">
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
                <TableCell className="text-end">
                  {timeSince(activity.time_stamp)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {tokenActivity.length === 0 && (
        <div className="flex flex-col items-center gap-3 pt-8 text-muted-foreground">
          <NoActivity size={42} />
          <p className="text-xl font-semibold">No activity yet!</p>
        </div>
      )}
    </>
  );
}
