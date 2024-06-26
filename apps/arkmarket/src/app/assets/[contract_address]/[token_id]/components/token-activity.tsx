import * as React from "react";
import { useQuery } from "react-query";
import { formatEther } from "viem";

import { shortAddress, timeSince } from "@ark-market/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { Token } from "~/types";
import { getTokenActivity } from "../data";

interface ActivityProps {
  token: Token;
}

const Activity: React.FC<ActivityProps> = ({ token }) => {
  const { data, error, isLoading } = useQuery(
    "tokenActivityData",
    () =>
      getTokenActivity({
        contract_address: token.contract_address,
        token_id: token.token_id,
      }),
    {
      refetchInterval: 10000,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-2">
      <div className="p-y-6 flex flex-col space-y-1.5 pb-2 pt-4">
        <h3 className="font-semibold leading-none tracking-tight">
          Item activity
        </h3>
        <p className="text-sm text-muted-foreground">
          All the token events and transactions
        </p>
      </div>
      <div className="rounded-md border">
        {!data?.history || data.history.length === 0 ? (
          <div className="p-4 text-center text-sm [&_p]:leading-relaxed">
            No activity available
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.history.map((activity) => (
                <TableRow key={activity.event_timestamp}>
                  <TableCell>{activity.order_status}</TableCell>
                  <TableCell>{activity.event_type}</TableCell>
                  <TableCell>
                    {activity.amount
                      ? `${formatEther(BigInt(activity.amount))} ETH`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {shortAddress(activity.previous_owner) || "-"}
                  </TableCell>
                  <TableCell>
                    {shortAddress(activity.new_owner) || "-"}
                  </TableCell>
                  <TableCell>{timeSince(activity.event_timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Activity;
