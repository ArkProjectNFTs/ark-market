import { Fragment } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import type { PropsWithClassName } from "@ark-market/ui";
import { timeSince } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

import type { TokenActivity } from "~/types";
import activityTypeMetadata from "~/constants/activity-type-metadata";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface MobileTokenActivityProps {
  tokenActivity: TokenActivity[];
}

export default function MobileTokenActivity({
  className,
  tokenActivity,
}: PropsWithClassName<MobileTokenActivityProps>) {
  const { address } = useAccount();

  return (
    <div className={className}>
      <p className="text-numbers text-sm font-medium text-muted-foreground">
        Event
      </p>
      <Separator className="my-4" />
      {tokenActivity.map((activity, index) => (
        <Fragment key={index}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {activityTypeMetadata[activity.activity_type].icon}
                <p>{activityTypeMetadata[activity.activity_type].title}</p>
              </div>
              {activity.price ? (
                <PriceTag price={activity.price} className="h-7 text-xs" />
              ) : (
                "_"
              )}
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <p>
                by{" "}
                <span className="text-muted-foreground">
                  {activity.from ? (
                    <Link
                      href={`/wallet/${activity.from}`}
                      className="text-muted-foreground"
                    >
                      {ownerOrShortAddress({
                        ownerAddress: activity.from,
                        address,
                      })}
                    </Link>
                  ) : (
                    "-"
                  )}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {timeSince(activity.time_stamp)}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </Fragment>
      ))}
    </div>
  );
}
