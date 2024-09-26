import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { ArrowLeft, ArrowRight, Filter } from "@ark-market/ui/icons";

interface CollectionActivityFiltersToggleProps {
  open: boolean;
  toggleOpen: () => void;
  filtersCount: number;
}

export default function CollectionActivityFiltersToggle({
  open,
  toggleOpen,
  filtersCount,
}: CollectionActivityFiltersToggleProps) {
  return (
    <Button
      variant="outline"
      size="xl"
      onClick={toggleOpen}
      className={cn("w-full md:w-auto", open && "bg-muted")}
    >
      <div className="hidden md:block">
        {open ? <ArrowLeft /> : <ArrowRight />}
      </div>
      <div className="md:hidden">{<Filter />}</div>
      Filters
      {filtersCount > 0 && (
        <span className="flex aspect-square w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
          {filtersCount}
        </span>
      )}
    </Button>
  );
}
