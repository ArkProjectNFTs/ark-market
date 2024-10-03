interface LatestDropStatus {
  status: "live" | "upcoming";
}

export default function LatestDropStatus({ status }: LatestDropStatus) {
  if (status === "live") {
    return (
      <div className="z-10 flex h-8 items-center gap-2.5 rounded-full bg-[#00000080] px-2.5 text-white">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <p className="text-sm font-semibold">Live</p>
      </div>
    );
  }

  return (
    <div className="z-10 flex h-8 items-center gap-2.5 rounded-full bg-[#00000080] px-2.5 text-white">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full scale-[2] rounded-full bg-primary opacity-40" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      <p className="dark text-sm font-semibold text-muted-foreground">
        Upcoming
      </p>
    </div>
  );
}
