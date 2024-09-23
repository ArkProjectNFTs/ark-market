import { Fragment } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  timeSince,
} from "@ark-market/ui";
import { VerifiedIcon } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

import type { CollectionActivity } from "~/types";
import Media from "~/components/media";
import activityTypeMetadata from "~/constants/activity-type-metadata";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface MobileCollectionActivityProps {
  collectionActivity: CollectionActivity[];
}

export default function MobileCollectionActivity({
  collectionActivity,
}: MobileCollectionActivityProps) {
  const { address } = useAccount();

  return (
    <div className="px-5">
      <p className="text-numbers text-sm font-medium text-muted-foreground">
        Event
      </p>
      <Separator className="my-5" />
      {collectionActivity.map((activity, index) => (
        <Fragment key={index}>
          <div className="flex items-center gap-4">
            <Media
              alt={activity.token_metadata?.name ?? ""}
              height={84}
              width={84}
              src={activity.token_metadata?.image}
              mediaKey={activity.token_metadata?.image_key}
              className="size-10 rounded-xs"
            />

            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <Link
                  className={cn("text-base font-medium", focusableStyles)}
                  href={`/token/${activity.address}/${activity.token_id}`}
                >
                  {activity.token_metadata?.name ?? activity.name}
                </Link>

                <div className="flex items-center gap-2.5">
                  {activityTypeMetadata[activity.activity_type].icon}
                  <p>{activityTypeMetadata[activity.activity_type].title}</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-between">
                <Link
                  href={`/collection/${activity.address}`}
                  className={cn(
                    "flex items-center gap-1 text-muted-foreground",
                    focusableStyles,
                  )}
                >
                  <p className={cn("text-sm", ellipsableStyles)}>
                    {activity.name}
                  </p>
                  {activity.is_verified && (
                    <VerifiedIcon className="size-4 flex-shrink-0 text-primary" />
                  )}
                </Link>

                {activity.price ? (
                  <PriceTag price={activity.price} className="h-7 text-xs" />
                ) : (
                  "_"
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm font-semibold">
            <div className="flex items-center gap-2">
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
              <p>
                for{" "}
                <span className="text-muted-foreground">
                  {activity.to ? (
                    <Link
                      href={`/wallet/${activity.to}`}
                      className="text-muted-foreground"
                    >
                      {ownerOrShortAddress({
                        ownerAddress: activity.to,
                        address,
                      })}
                    </Link>
                  ) : (
                    "-"
                  )}
                </span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {timeSince(activity.time_stamp)}
            </p>
          </div>
          <Separator className="my-5" />
        </Fragment>
      ))}
    </div>
  );
}
