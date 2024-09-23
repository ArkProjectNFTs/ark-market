"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { parseAsJson, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";

import type { ViewType } from "~/components/view-type-toggle-group";
import type { Filters } from "~/types";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "~/lib/getCollectionTokens";
import CollectionItemsData from "./collection-items-data";
import { CollectionItemsDataFallback } from "./collection-items-data-fallback";
import CollectionItemsFiltersDialog from "./collection-items-filters-dialog";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsFiltersTraits from "./collection-items-filters-traits";
import CollectionItemsToolbar from "./collection-items-toolbar";
import CollectionNav from "./collection-nav";

interface CollectionProps {
  collectionAddress: string;
  collectionTokenCount: number;
}

const isValidViewType = (value: string): value is ViewType =>
  ["large-grid", "small-grid", "list"].includes(value);

export default function CollectionItems({
  collectionAddress,
}: CollectionProps) {
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
  const [filtersDialogOpen, setFiltersDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 500);
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

  useEffect(() => {
    const savedViewType = localStorage.getItem("viewType");

    if (savedViewType && isValidViewType(savedViewType)) {
      setViewType(savedViewType);
    }
  }, []);

  const handleViewTypeChange = useCallback((newViewType: ViewType) => {
    setViewType(newViewType);
    localStorage.setItem("viewType", newViewType);
  }, []);

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
      <Suspense>
        <CollectionItemsFiltersPanel
          collectionAddress={collectionAddress}
          filters={filters}
          onFiltersChange={handlerFiltersChange}
          isOpen={filtersPanelOpen}
        />
      </Suspense>
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
            setViewType={handleViewTypeChange}
            toggleFiltersPanel={toggleFiltersPanel}
            filtersPanelOpen={filtersPanelOpen}
            openFiltersDialog={() => setFiltersDialogOpen(true)}
            filtersCount={filtersCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CollectionItemsFiltersTraits
            traits={filters.traits}
            onRemove={removeFiltersTraits}
            onReset={resetFiltersTraits}
          />
        </div>
        <Suspense
          fallback={<CollectionItemsDataFallback viewType={viewType} />}
        >
          <CollectionItemsData
            collectionAddress={collectionAddress}
            sortDirection={sortDirection}
            sortBy={sortBy}
            viewType={viewType}
            filters={filters}
            searchQuery={debouncedSearchQuery}
          />
        </Suspense>
      </div>
    </div>
  );
}
