import { useAccount } from "@starknet-react/core";

import { timeSince } from "@ark-market/ui";
import { NoActivity } from "@ark-market/ui/icons";
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
import EventCell from "~/components/cells/activity-event-cell";
import ActivityToFromCell from "~/components/cells/activity-from-cell";

interface DesktopTokenActivityProps {
  tokenActivity: TokenActivity[];
}

export default function DesktopTokenActivity({
  tokenActivity,
}: DesktopTokenActivityProps) {
  const { address } = useAccount();

  return (
    <>
      <Table>
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
          {tokenActivity.map((activity) => (
            <TableRow
              className="group h-[4.6875rem]"
              key={`activity-${activity.time_stamp}`}
            >
              <EventCell activity={activity} />
              <TableCell>
                {activity.price ? <PriceTag price={activity.price} /> : "_"}
              </TableCell>

              <ActivityToFromCell
                ownerAddress={activity.from ?? ""}
                address={address}
              />

              <ActivityToFromCell
                ownerAddress={activity.to ?? ""}
                address={address}
              />

              <TableCell className="text-end">
                {timeSince(activity.time_stamp)}
              </TableCell>
            </TableRow>
          ))}
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
