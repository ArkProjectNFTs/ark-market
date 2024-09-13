"use client";

import moment from "moment";

import { TimerReset } from "@ark-market/ui/icons";

interface TokenActionsListingExpirationProps {
  expiresAt: number | null;
}

export default function TokenActionsListingExpiration({
  expiresAt,
}: TokenActionsListingExpirationProps) {
  if (!expiresAt) {
    return null;
  }

  const now = moment();
  const target = moment.unix(expiresAt);
  const duration = moment.duration(target.diff(now));
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (
    <div className="flex items-center gap-1.5">
      <TimerReset />
      <p>
        Time Left {days}d {hours}h {minutes}m
      </p>
    </div>
  );
}
