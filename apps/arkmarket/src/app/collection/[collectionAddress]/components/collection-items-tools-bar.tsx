import type { PropsWithClassName } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import FiltersIcon from "@ark-market/ui/icons/filters-icon";
import { Input } from "@ark-market/ui/input";

import "@ark-market/ui/toggle-group";

import { cn } from "@ark-market/ui";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";
import ViewTypeToggleButton from "../../../../components/view-type-toggle-button";
import ViewTypeToggleGroup from "../../../../components/view-type-toggle-group";
import CollectionItemsSortingSelect from "./collection-item-sorting-select";
import CollectionItemsFiltersModal from "./collection-items-filters-modal";
import LiveResultsIndicator from "./live-results-indicator";

interface ToolsBarProps {
  setSortBy: (sortBy: CollectionSortBy) => void;
  setSortDirection: (sortDirection: CollectionSortDirection) => void;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  toggleFiltersPanel: () => void;
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  totalTokensCount: number;
}

export default function CollectionItemsToolsBar({
  className,
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
  toggleFiltersPanel,
  viewType,
  setViewType,
  totalTokensCount,
}: PropsWithClassName<ToolsBarProps>) {
  return (
    <>
      <div className={cn("bg-background", className)}>
        <div className="flex items-center gap-2 md:gap-6">
          <CollectionItemsFiltersModal>
            <Button variant="secondary" size="icon" className="sm:hidden">
              <FiltersIcon />
            </Button>
          </CollectionItemsFiltersModal>
          <Button
            onClick={toggleFiltersPanel}
            variant="secondary"
            size="lg"
            className="hidden sm:flex"
          >
            <FiltersIcon />
            <span>Filters</span>
          </Button>

          <LiveResultsIndicator
            totalCount={totalTokensCount}
            className="hidden lg:flex"
          />

          <Input className="flex-1" placeholder="Search item" />

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
    </>
  );
}
