import { cn } from "@ark-market/ui";
import { NftCard } from "@ark-market/ui/nft-card";
import { Skeleton } from "@ark-market/ui/skeleton";

const ITEMS_COUNT = 30;

type ViewType = "large-grid" | "small-grid" | "list";

function Card({ viewType }: { viewType: ViewType }) {
  return (
    <NftCard className="rounded">
      <Skeleton className="image aspect-square" />
      <div
        className={cn(
          "flex flex-col gap-2 p-3",
          viewType === "small-grid" ? "h-[107px]" : "h-[120px]",
        )}
      >
        <Skeleton
          className={cn(
            "w-full rounded",
            viewType === "small-grid" ? "h-[23px]" : "h-[33px]",
          )}
        />
        <Skeleton
          className={cn(
            "w-1/2 rounded",
            viewType === "small-grid" ? "h-[20px]" : "h-[23px]",
          )}
        />
      </div>
    </NftCard>
  );
}

export function CollectionItemsDataFallback({
  viewType,
}: {
  viewType: ViewType;
}) {
  if (viewType === "list") {
    return null;
  }

  return (
    <div
      className={cn(
        "mb-2 grid w-full grid-cols-2 gap-4 px-5 sm:gap-2",
        viewType === "small-grid"
          ? "sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]"
          : "sm:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]",
      )}
    >
      {Array.from(Array(ITEMS_COUNT).keys()).map((index) => (
        <Card key={`cidf-${index}-${viewType}`} viewType={viewType} />
      ))}
    </div>
  );
}
