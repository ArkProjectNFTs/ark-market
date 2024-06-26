import { Fragment } from "react";
import {
  ArrowLeftRight,
  List,
  ListX,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

const activityTypeToItem = new Map([
  ["sale", { icon: <ShoppingCart size={20} />, title: "Sale" }],
  ["transfer", { icon: <ArrowLeftRight size={20} />, title: "Transfer" }],
  ["list", { icon: <List size={20} />, title: "List" }],
  ["offer", { icon: <Tag size={20} />, title: "Offer" }],
  ["cancel_offer", { icon: <X size={20} />, title: "Cancel Offer" }],
  ["delist", { icon: <ListX size={20} />, title: "Delist" }],
]);

const activityData = [
  {
    type: "transfer",
    from: "0x123",
    to: "0x456",
  },
  {
    type: "list",
    price: 1180000000000000000n,
    from: "0x123",
  },
  {
    type: "offer",
    price: 1840000000000000000n,
    from: "0x123",
    to: "0x456",
  },
  {
    type: "cancel_offer",
    price: 1540000000000000000n,
    from: "0x123",
    to: "0x456",
  },
  {
    type: "delist",
    price: 3240000000000000000n,
    from: "0x123",
  },
  {
    type: "sale",
    price: 1140000000000000000n,
    from: "0x123",
    to: "0x456",
  },
];

export default function MobileTokenActivity({ className }: PropsWithClassName) {
  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">Activity</h2>
        <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm font-medium text-secondary-foreground">
          {activityData.length}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-muted-foreground">Event</p>
        <Separator className="my-4" />

        {activityData.map((activity, index) => {
          const activityItem = activityTypeToItem.get(activity.type);

          return (
            <Fragment key={index}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {activityItem?.icon}
                    <p>{activityItem?.title}</p>
                  </div>
                  {activity.price !== undefined ? (
                    <PriceTag price={activity.price} className="h-7 text-xs" />
                  ) : (
                    "_"
                  )}
                </div>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <p>
                    by{" "}
                    <span className="text-muted-foreground">
                      {activity.from}{" "}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">8min ago</p>
                </div>
              </div>
              <Separator className="my-4" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
