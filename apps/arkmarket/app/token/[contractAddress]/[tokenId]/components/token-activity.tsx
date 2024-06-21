import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { cn } from "@ark-market/ui/lib/utils";

const activityData = [];

export default function TokenActivity({ className }: PropsWithClassName) {
  return (
    // TODO @YohanTz: remove min-h
    <div className={cn("min-h-[100vh]", className)}>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-semibold">Activity</h2>
        <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm font-medium text-secondary-foreground">
          {activityData.length}
        </div>
      </div>
    </div>
  );
}
