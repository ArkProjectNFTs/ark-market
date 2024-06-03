import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { cn } from "@ark-market/ui/lib/utils";

export const collectionBannerRemHeight = 16.5;

export default function CollectionBanner({ className }: PropsWithClassName) {
  return (
    <div
      className={cn("bg-secondary", className)}
      style={{ height: `${collectionBannerRemHeight}rem` }}
    />
  );
}
