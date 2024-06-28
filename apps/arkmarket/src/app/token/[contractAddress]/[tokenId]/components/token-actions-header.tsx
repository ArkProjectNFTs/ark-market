"use client";

import { TimerReset } from "lucide-react";
import moment from "moment";

import TokenActionsListingBadge from "./token-actions-listing-badge";

interface TokenActionsProps {
  isListed: boolean;
  isAuction: boolean;
  expiresAt: number;
}

export default function TokenActionsHeader({
  isListed,
  isAuction,
  expiresAt,
}: TokenActionsProps) {
  const now = moment();
  const target = moment.unix(expiresAt);
  const duration = moment.duration(target.diff(now));
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    <div className="mb-6 flex flex-col-reverse gap-6 font-medium text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-5">
      <TokenActionsListingBadge isListed={isListed} isAuction={isAuction} />
      {isListed && (
        <div className="flex items-center gap-1.5">
          <TimerReset />
          <p>
            Time Left {days}d {hours}h {minutes}m
          </p>
        </div>
      )}
    </div>
  );
}
