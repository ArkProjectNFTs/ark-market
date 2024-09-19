"use client";

import TokenActionsListingBadge from "./token-actions-listing-badge";
import TokenActionsListingExpiration from "./token-actions-listing-expiration";

interface TokenActionsProps {
  isListed: boolean;
  isAuction: boolean;
  expiresAt: number | null;
}

export default function TokenActionsHeader({
  isListed,
  isAuction,
  expiresAt,
}: TokenActionsProps) {
  return (
    <div className="mb-6 flex flex-col-reverse gap-6 font-medium text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-5">
      <TokenActionsListingBadge isListed={isListed} isAuction={isAuction} />
      {isListed && <TokenActionsListingExpiration expiresAt={expiresAt} />}
    </div>
  );
}
