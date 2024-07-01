import { cn } from "@ark-market/ui";

interface ListingBadgeProps {
  isListed: boolean;
  isAuction: boolean;
}

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
            ? "border-green-500 text-green-500"
            : "border-blue-500 text-blue-500"
          : "border-orange-500 text-orange-500",
      )}
    >
      {isListed ? (isAuction ? "Up for auction" : "For sale") : "Not for sale"}
    </div>
  );
}
