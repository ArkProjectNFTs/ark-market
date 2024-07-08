import { Fragment } from "react";
import { Meh } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { shortAddress, timeSince } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

import type { TokenActivity } from "../queries/getTokenData";
import { activityTypeToItem } from "./desktop-token-activity";

interface MobileTokenActivityProps {
  tokenActivity: TokenActivity[];
}

export default function MobileTokenActivity({
  className,
  tokenActivity,
}: PropsWithClassName<MobileTokenActivityProps>) {
  return (
    <div className={className}>
      <p className="text-sm font-semibold text-muted-foreground">Event</p>
      <Separator className="my-4" />

      {tokenActivity.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-10 text-muted-foreground">
          <Meh size={42} />
          <p className="text-xl font-semibold">No activity yet!</p>
        </div>
      )}

      {tokenActivity.map((activity, index) => {
        const activityItem = activityTypeToItem.get(activity.activity_type);

        return (
          <Fragment key={index}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {activityItem?.icon}
                  <p>{activityItem?.title}</p>
                </div>
                {activity.price !== null ? (
                  <PriceTag price={activity.price} className="h-7 text-xs" />
                ) : (
                  "_"
                )}
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <p>
                  by{" "}
                  <span className="text-muted-foreground">
                    {activity.from ? shortAddress(activity.from) : "_"}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {timeSince(activity.time_stamp)}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
          </Fragment>
        );
      })}
    </div>
  );
}
