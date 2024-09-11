import { cn } from "@ark-market/ui";

interface ListingBadgeProps {
  isListed: boolean;
  isAuction: boolean;
}

export default function TokenActionsListingBadge({
  isListed,
  isAuction,
}: ListingBadgeProps) {
  const borderClass = isListed
    ? isAuction
      ? "border-green-500 text-green-500"
      : "border-blue-500 text-blue-500"
    : "border-orange-500 text-orange-500";

  const statusText = isListed
    ? isAuction
      ? "Up for auction"
      : "For sale"
    : "Not for sale";

  return (
    <div
      className={cn("w-fit rounded-xl border px-4 py-2 text-sm", borderClass)}
    >
      {statusText}
    </div>
  );
}
