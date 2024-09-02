"use client";

import { useState } from "react";
import { parseAsJson, useQueryState } from "nuqs";

import type { ViewType } from "~/components/view-type-toggle-group";
import type { Filters } from "~/types";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "~/lib/getCollectionTokens";
import CollectionItemsData from "./collection-items-data";
import CollectionItemsFiltersDialog from "./collection-items-filters-dialog";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsFiltersTraits from "./collection-items-filters-traits";
import CollectionItemsToolbar from "./collection-items-toolbar";
import CollectionNav from "./collection-nav";

interface CollectionProps {
  collectionAddress: string;
  collectionTokenCount: number;
}

export default function CollectionItems({
  collectionAddress,
  collectionTokenCount,
}: CollectionProps) {
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
  const [filtersDialogOpen, setFiltersDialogOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>("large-grid");
  const [sortDirection, setSortDirection] = useQueryState(
    collectionSortDirectionKey,
    collectionSortDirectionsParser,
  );
  const [sortBy, setSortBy] = useQueryState(
    collectionSortByKey,
    collectionSortByParser,
  );
  const [filters, setFilters] = useQueryState<Filters>(
    "filters",
    parseAsJson<Filters>().withDefault({
      traits: {},
    }),
  );

  const toggleFiltersPanel = () => setFiltersPanelOpen((open) => !open);

  const handlerFiltersChange = async (newFilters: Filters) => {
    await setFilters(newFilters);
  };

  const resetFiltersTraits = async () => {
    await setFilters({
      ...filters,
      traits: {},
    });
  };

  const removeFiltersTraits = async (key: string, value: string) => {
    const newTraits = { ...filters.traits };
    const values = newTraits[key] ?? [];
    const newValues = values.filter((v) => v !== value);

    if (newValues.length === 0) {
      delete newTraits[key];
    } else {
      newTraits[key] = newValues;
    }

    await setFilters({
      ...filters,
      traits: newTraits,
    });
  };

  const filtersCount = Object.values(filters.traits).reduce(
    (acc, traitValues) => acc + traitValues.length,
    0,
  );

  return (
    <div className="flex">
      {filtersPanelOpen && (
        <CollectionItemsFiltersPanel
          collectionAddress={collectionAddress}
          onFiltersChange={handlerFiltersChange}
          filters={filters}
        />
      )}
      <CollectionItemsFiltersDialog
        collectionAddress={collectionAddress}
        filters={filters}
        onFiltersChange={handlerFiltersChange}
        resetFilters={resetFiltersTraits}
        open={filtersDialogOpen}
        setOpen={setFiltersDialogOpen}
      />
      <div className="w-full">
        <div className="sticky top-[var(--site-header-height)] z-20 bg-background">
          <CollectionNav collectionAddress={collectionAddress} />
          <CollectionItemsToolbar
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewType={viewType}
            setViewType={setViewType}
            totalTokensCount={collectionTokenCount}
            toggleFiltersPanel={toggleFiltersPanel}
            filtersPanelOpen={filtersPanelOpen}
            openFiltersDialog={() => setFiltersDialogOpen(true)}
            filtersDialogOpen={filtersDialogOpen}
            filtersCount={filtersCount}
          />
          <CollectionItemsFiltersTraits
            traits={filters.traits}
            onRemove={removeFiltersTraits}
            onReset={resetFiltersTraits}
          />
        </div>
        <CollectionItemsData
          collectionAddress={collectionAddress}
          sortDirection={sortDirection}
          sortBy={sortBy}
          viewType={viewType}
          filters={filters}
        />
      </div>
    </div>
  );
}
