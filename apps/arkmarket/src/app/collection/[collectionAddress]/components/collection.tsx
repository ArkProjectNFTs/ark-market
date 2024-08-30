"use client";

import { useState } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import type { ViewType } from "~/components/view-type-toggle-group";
import type { Collection } from "~/types";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "~/lib/getCollectionTokens";
import CollectionActivityData from "./collection-activity-data";
import CollectionItemsActivityHeader from "./collection-items-activity-header";
import CollectionItemsData from "./collection-items-data";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsToolsBar from "./collection-items-tools-bar";

interface CollectionProps {
  collectionAddress: string;
  collectionTokenCount: number;
}

export default function Collection({
  collectionAddress,
  collectionTokenCount,
}: CollectionProps) {
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useQueryState(
    "activeTab",
    parseAsStringLiteral(["items", "activity"]).withDefault("items"),
  );
  const [sortDirection, setSortDirection] = useQueryState(
    collectionSortDirectionKey,
    collectionSortDirectionsParser,
  );
  const [sortBy, setSortBy] = useQueryState(
    collectionSortByKey,
    collectionSortByParser,
  );

  const [viewType, setViewType] = useState<ViewType>("large-grid");
  const toggleFiltersPanel = () => setFiltersPanelOpen((open) => !open);

  return (
    <div className="flex">
      {activeTab === "items" && (
        <CollectionItemsFiltersPanel
          className="sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height))] sm:block"
          filtersOpen={filtersPanelOpen}
        />
      )}
      <div className="w-full">
        <div className="sticky top-[var(--site-header-height)] z-20 bg-background">
          <CollectionItemsActivityHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            {activeTab === "items" && (
              <CollectionItemsToolsBar
                className="mt-4 sm:mt-6"
                toggleFiltersPanel={toggleFiltersPanel}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewType={viewType}
                setViewType={setViewType}
                totalTokensCount={collectionTokenCount}
              />
            )}
          </CollectionItemsActivityHeader>
        </div>
        <div className="flex-1">
          {activeTab === "items" && (
            <CollectionItemsData
              collectionAddress={collectionAddress}
              totalTokensCount={collectionTokenCount}
              sortDirection={sortDirection}
              sortBy={sortBy}
              viewType={viewType}
            />
          )}
          {activeTab === "activity" && (
            <CollectionActivityData collectionAddress={collectionAddress} />
          )}
        </div>
      </div>
    </div>
  );
}
