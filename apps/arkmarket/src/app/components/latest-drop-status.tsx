import { memo } from "react";

interface LatestDropStatusProps {
  status: "live" | "upcoming";
}

function LatestDropStatus({ status }: LatestDropStatusProps) {
  const isLive = status === "live";
  
  return (
    <div className="z-10 flex h-8 items-center gap-2.5 rounded-sm bg-secondary px-2.5 text-foreground">
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
            isLive ? "bg-green-400 opacity-75" : "bg-accent opacity-75 scale-[2]"
          }`}
        />
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            isLive ? "bg-green-500" : "bg-foreground"
          }`}
        />
      </span>
      <p className="text-sm font-semibold">{isLive ? "Live" : "Upcoming"}</p>
    </div>
  );
}

export default memo(LatestDropStatus);
