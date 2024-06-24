"use client";

import { useQuery } from "react-query";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ark-market/ui/components/tooltip";
import { cn } from "@ark-market/ui/lib/utils";

import getSystemStatus from "~/lib/getSystemStatus";

const statuses = {
  ok: {
    status: "Live data active",
    message: "All systems operational",
    color: "bg-green-500",
    bg: "bg-green-400",
  },
  notok: {
    status: "Data unavailable",
    message: "Systems are currently downgraded",
    color: "bg-orange-500",
    bg: "bg-orange-400",
  },
};

export default function SystemStatus() {
  const { isLoading, error, data } = useQuery("systemStatus", getSystemStatus, {
    refetchInterval: 15_000,
    initialData: { status: "ok" },
  });

  if (isLoading || error || !data) {
    return null;
  }

  const status = statuses[(data.status as keyof typeof statuses) || "ok"];

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="cursor-default">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                  status.color,
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2.5 w-2.5 rounded-full",
                  status.bg,
                )}
              />
            </span>
            <p>{status.status}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{status.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
