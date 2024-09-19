import { Button } from "@ark-market/ui/button";
import { Filter } from "@ark-market/ui/icons";

import "@ark-market/ui/toggle-group";

import { useMediaQuery } from "usehooks-ts";

import { cn } from "@ark-market/ui";
import { SearchInput } from "@ark-market/ui/search-input";

import type { ViewType } from "../view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "~/lib/getCollectionTokens";
import ViewTypeToggleButton from "../view-type-toggle-button";
import ViewTypeToggleGroup from "../view-type-toggle-group";
import CollectionItemsSortingSelect from "./collection-item-sorting-select";

// import LiveResultsIndicator from "./live-results-indicator";

interface CollectionItemsToolbarProps {
  setSortBy: (sortBy: CollectionSortBy) => void;
  setSortDirection: (sortDirection: CollectionSortDirection) => void;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  toggleFiltersPanel: () => void;
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  totalTokensCount: number;
  filtersPanelOpen: boolean;
  filtersDialogOpen: boolean;
  openFiltersDialog: () => void;
  filtersCount: number;
}

export default function CollectionItemsToolbar({
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
  toggleFiltersPanel,
  viewType,
  setViewType,
  // totalTokensCount,
  filtersPanelOpen,
  // filtersDialogOpen,
  openFiltersDialog,
  filtersCount,
}: CollectionItemsToolbarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="bg-background px-5 pb-5">
      <div className="flex items-center gap-2 md:gap-6">
        <Button
          className={cn("", filtersPanelOpen && "bg-muted")}
          variant="outline"
          size="xl"
          onClick={isDesktop ? toggleFiltersPanel : openFiltersDialog}
        >
          <Filter className="size-3" />
          <span className="hidden lg:block">Filters</span>
          {filtersCount > 0 && (
            <span className="flex aspect-square w-5 items-center justify-center rounded-full bg-white text-xs text-primary-foreground">
              {filtersCount}
            </span>
          )}
        </Button>
        {/* <LiveResultsIndicator totalCount={totalTokensCount} /> */}
        <SearchInput className="flex-1" placeholder="Search item" />
        <CollectionItemsSortingSelect
          className="hidden lg:block"
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
        />
        <ViewTypeToggleGroup
          className="hidden md:flex"
          setViewType={setViewType}
          viewType={viewType}
        />
        <ViewTypeToggleButton
          className="md:hidden"
          setViewType={setViewType}
          viewType={viewType}
        />
      </div>
    </div>
  );
}
