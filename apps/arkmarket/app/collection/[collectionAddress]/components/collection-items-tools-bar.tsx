import type { HTMLAttributes } from "react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import FiltersIcon from "@ark-market/ui/components/icons/filters-icon";
import { Input } from "@ark-market/ui/components/input";

import "@ark-market/ui/components/toggle-group";

import { cn } from "@ark-market/ui/lib/utils";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";
import type { ViewType } from "./view-type-toggle-group";
import CollectionItemsSortingSelect from "./collection-item-sorting-select";
import ViewTypeToggleButton from "./view-type-toggle-button";
import ViewTypeToggleGroup from "./view-type-toggle-group";

interface ResultsNumberProps {
  totalCount: number;
}

function ResultsNumber({
  className,
  totalCount,
}: PropsWithClassName<ResultsNumberProps>) {
  return (
    <div className={cn("flex items-center gap-3 font-medium", className)}>
      <span className="relative flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
      </span>

      {/* TODO @YohanTz: Number of tokens */}
      <p>{totalCount} results</p>
    </div>
  );
}

interface ToolsBarProps {
  setSortBy: (sortBy: CollectionSortBy) => void;
  setSortDirection: (sortDirection: CollectionSortDirection) => void;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  style?: HTMLAttributes<HTMLDivElement>["style"];
  toggleFiltersOpen: () => void;
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

export default function CollectionItemsToolsBar({
  className,
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
  style,
  toggleFiltersOpen,
  viewType,
  setViewType,
}: PropsWithClassName<ToolsBarProps>) {
  return (
    <div className={cn("bg-background", className)} style={style}>
      <div className="flex items-center gap-2 md:gap-6">
        <Button onClick={toggleFiltersOpen} variant="secondary" size="lg">
          <FiltersIcon />
          <span className="hidden sm:block">Filters</span>
        </Button>

        <ResultsNumber totalCount={0} className="hidden lg:flex" />

        <Input className="flex-1" placeholder="Search item" />

        <CollectionItemsSortingSelect
          className="hidden lg:block"
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
        />

        <ViewTypeToggleGroup
          viewType={viewType}
          setViewType={setViewType}
          className="hidden md:block"
        />
        <ViewTypeToggleButton
          className="md:hidden"
          viewType={viewType}
          setViewType={setViewType}
        />
      </div>
      <ResultsNumber className="mt-6 lg:hidden" totalCount={0} />
    </div>
  );
}
