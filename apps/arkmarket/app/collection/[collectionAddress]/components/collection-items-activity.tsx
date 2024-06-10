"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";

import { cn } from "@ark-market/ui/lib/utils";

import type { CollectionTokensApiResponse } from "../queries/getCollectionData";
import type { ViewType } from "./view-type-toggle-group";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "../../search-params";
import CollectionItemsActivityHeader from "./collection-items-activity-header";
import CollectionItemsData from "./collection-items-data";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsToolsBar from "./collection-items-tools-bar";
import LiveResultsIndicator from "./live-results-indicator";

interface CollectionItemsActivityProps {
  collectionAddress: string;
  collectionTokensInitialData: CollectionTokensApiResponse;
}

export default function CollectionItemsActivity({
  collectionAddress,
  collectionTokensInitialData,
}: CollectionItemsActivityProps) {
  const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);
  // TODO @YohanTz: Get State from URL query params
  const [activeTab, setActiveTab] = useState("items");

  const [sortDirection, setSortDirection] = useQueryState(
    collectionSortDirectionKey,
    collectionSortDirectionsParser,
  );
  const [sortBy, setSortBy] = useQueryState(
    collectionSortByKey,
    collectionSortByParser,
  );

  // TODO @YohanTz: Choose between local storage and URL query param
  const [viewType, setViewType] = useState<ViewType>("large-grid");

  const canShowItemsFilter = activeTab === "items";

  return (
    <div className="flex">
      <CollectionItemsFiltersPanel
        className={cn(
          "sticky z-10 hidden sm:block",
          "h-[calc(100vh-var(--site-header-height)-var(--collection-footer-height))]",
          "md:h-[calc(100vh-var(--site-header-height)-var(--collection-header-folded-height)-var(--collection-footer-height))]",
          "top-[var(--site-header-height)]",
          "md:top-[calc(var(--site-header-height)+var(--collection-header-folded-height))]",
        )}
        filtersOpen={itemsFiltersOpen && canShowItemsFilter}
      />
      {/* <CollectionItemsFiltersModal
        filtersOpen={itemsFiltersOpen && canShowItemsFilter}
      /> */}

      <div className="w-full">
        <CollectionItemsActivityHeader
          activeTab={activeTab}
          className={cn(
            "sticky z-10 bg-background p-6",
            "top-[var(--site-header-height)]",
            "md:top-[calc(var(--site-header-height)+var(--collection-header-folded-height))]",
          )}
          onTabChange={setActiveTab}
        >
          {activeTab === "items" && (
            <CollectionItemsToolsBar
              className="mt-6"
              toggleFiltersOpen={() =>
                setItemsFiltersOpen((previous) => !previous)
              }
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewType={viewType}
              setViewType={setViewType}
            />
          )}
          {activeTab === "activity" && <p>Coming</p>}
        </CollectionItemsActivityHeader>
        <LiveResultsIndicator className="p-6 lg:hidden" totalCount={0} />

        <div
          className={cn(
            "min-h-[calc(100vh-var(--site-header-height)+var(--collection-header-folded-height)+var(--collection-footer-height))]",
          )}
        >
          {activeTab === "items" && (
            <CollectionItemsData
              collectionTokensInitialData={collectionTokensInitialData}
              collectionAddress={collectionAddress}
              sortDirection={sortDirection}
              sortBy={sortBy}
              viewType={viewType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
