import type { HTMLAttributes } from "react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import BigGridIcon from "@ark-market/ui/components/icons/big-grid-icon";
import FiltersIcon from "@ark-market/ui/components/icons/filters-icon";
import ListIcon from "@ark-market/ui/components/icons/list-icon";
import SmallGridIcon from "@ark-market/ui/components/icons/small-grid-icon";
import { Input } from "@ark-market/ui/components/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ark-market/ui/components/toggle-group";
import { cn } from "@ark-market/ui/lib/utils";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";
import CollectionItemsSortingSelect from "./collection-item-sorting-select";

function LiveDataIndicator() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="48"
      viewBox="0 0 54 48"
      fill="none"
    >
      <g filter="url(#filter0_f_479_6095)">
        <circle cx="24" cy="24" r="10" fill="#63D056" />
      </g>
      <circle cx="23" cy="22" r="8" fill="#63D056" />
      <defs>
        <filter
          id="filter0_f_479_6095"
          x="-6"
          y="-6"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="10"
            result="effect1_foregroundBlur_479_6095"
          />
        </filter>
      </defs>
    </svg>
  );
}

interface ToolsBarProps {
  setSortBy: (sortBy: CollectionSortBy) => void;
  setSortDirection: (sortDirection: CollectionSortDirection) => void;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  style?: HTMLAttributes<HTMLDivElement>["style"];
  toggleFiltersOpen: () => void;
}

export default function CollectionItemsToolsBar({
  className,
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
  style,
  toggleFiltersOpen,
}: PropsWithClassName<ToolsBarProps>) {
  return (
    <div className={cn("bg-background", className)} style={style}>
      <div className="flex items-center gap-6">
        <Button onClick={toggleFiltersOpen} variant="secondary" size="lg">
          <FiltersIcon />
          Filters
        </Button>

        <div className="flex items-center font-medium">
          <LiveDataIndicator />
          {/* TODO @YohanTz: Number of tokens */}
          <p>Unknown results</p>
        </div>

        <Input className="flex-1" placeholder="Search item" />

        <CollectionItemsSortingSelect
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
        />

        <ToggleGroup type="single" defaultValue="big-grid">
          <ToggleGroupItem value="big-grid" aria-label="Toggle bold">
            <BigGridIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="small-grid" aria-label="Toggle italic">
            <SmallGridIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle strikethrough"
          >
            <ListIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
