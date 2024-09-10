import { cn } from "@ark-market/ui";

import { env } from "~/env";

interface ListingBadgeProps {
  isListed: boolean;
  isAuction: boolean;
}

const isUnframed = env.NEXT_PUBLIC_THEME === "unframed";

export default function TokenActionsListingBadge({
  isListed,
  isAuction,
}: ListingBadgeProps) {
  return (
    <div
      className={cn(
        "w-fit rounded-xl border border-blue-500 px-4 py-2 text-sm text-blue-500",
        isListed
          ? isAuction
            ? isUnframed
              ? "border-primary text-primary"
              : "border-green-500 text-green-500"
            : isUnframed
              ? "border-primary text-primary"
              : "border-blue-500 text-blue-500"
          : isUnframed
            ? "border-[#CCD0DB] text-[#CCD0DB]"
            : "border-orange-500 text-orange-500",
      )}
    >
      {isListed ? (isAuction ? "Up for auction" : "For sale") : "Not for sale"}
    </div>
  );
}
