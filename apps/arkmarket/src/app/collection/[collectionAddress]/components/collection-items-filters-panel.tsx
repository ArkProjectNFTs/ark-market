import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import CollectionItemsFiltersContent from "./collection-items-filters-content";

interface FiltersProps {
  filtersOpen: boolean;
}

export default function CollectionItemsFiltersPanel({
  className,
  filtersOpen,
}: PropsWithClassName<FiltersProps>) {
  return (
    filtersOpen && (
      <div
        className={cn(
          "w-64 flex-shrink-0 overflow-y-auto border-r border-border",
          className,
        )}
      >
        <CollectionItemsFiltersContent />
      </div>
    )
  );
}
