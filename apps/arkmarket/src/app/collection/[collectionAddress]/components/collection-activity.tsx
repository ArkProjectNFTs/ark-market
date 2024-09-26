"use client";

import { useState } from "react";
import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from "nuqs";

import { activityTypes } from "~/types";
import CollectionActivityData from "./collection-activity-data";
import CollectionActivityFiltersModal from "./collection-activity-filters-modal";
import CollectionActivityFiltersPanel from "./collection-activity-filters-panel";
import CollectionActivityFiltersToggle from "./collection-activity-filters-toggle";
import CollectionNav from "./collection-nav";

interface CollectionActivityProps {
  tokenCount: number;
  collectionAddress: string;
}

export default function CollectionActivity({
  tokenCount,
  collectionAddress,
}: CollectionActivityProps) {
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  const toggleFiltersPanel = () => setFiltersPanelOpen((open) => !open);
  const toggleFiltersModal = () => setFiltersModalOpen((open) => !open);

  const [filters, setFilters] = useQueryState(
    "filters",
    parseAsArrayOf(parseAsStringLiteral(activityTypes)).withDefault([]),
  );

  return (
    <>
      <div className="flex">
        <CollectionActivityFiltersPanel
          open={filtersPanelOpen}
          filters={filters}
          setFilters={setFilters}
        />
        <CollectionActivityFiltersModal
          open={filtersModalOpen}
          setOpen={setFiltersModalOpen}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="w-full">
          <div className="sticky top-[var(--site-header-height)] z-20 bg-background">
            <CollectionNav collectionAddress={collectionAddress} />
            <div className="px-5 pb-5">
              <div className="hidden md:block">
                <CollectionActivityFiltersToggle
                  open={filtersPanelOpen}
                  toggleOpen={toggleFiltersPanel}
                  filtersCount={filters.length}
                />
              </div>
              <div className="md:hidden">
                <CollectionActivityFiltersToggle
                  open={filtersModalOpen}
                  toggleOpen={toggleFiltersModal}
                  filtersCount={filters.length}
                />
              </div>
            </div>
          </div>
          <CollectionActivityData
            collectionAddress={collectionAddress}
            collectionTokenCount={tokenCount}
            filters={filters}
          />
        </div>
      </div>
    </>
  );
}
