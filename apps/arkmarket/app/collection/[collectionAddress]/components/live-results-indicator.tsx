import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { cn, formatNumber } from "@ark-market/ui/lib/utils";

interface LiveResultsIndicatorProps {
  totalCount: number;
}

export default function LiveResultsIndicator({
  className,
  totalCount,
}: PropsWithClassName<LiveResultsIndicatorProps>) {
  return (
    <div className={cn("flex items-center gap-3 font-medium", className)}>
      <span className="relative flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
      </span>

      {/* TODO @YohanTz: Number of tokens */}
      <p>{formatNumber(totalCount)} results</p>
    </div>
  );
}
