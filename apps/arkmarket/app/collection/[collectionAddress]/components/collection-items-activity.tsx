"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useQueryState } from "nuqs";

import { cn } from "@ark-market/ui/lib/utils";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type { CollectionTokensApiResponse } from "../queries/getCollectionData";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "../../search-params";
import CollectionItemsActivityHeader from "./collection-items-activity-header";
import CollectionItemsData from "./collection-items-data";
import CollectionItemsToolsBar from "./collection-items-tools-bar";
import LiveResultsIndicator from "./live-results-indicator";

interface CollectionItemsActivityProps {
  collectionAddress: string;
  collectionTokensInitialData: CollectionTokensApiResponse;
  toggleFiltersPanel: () => void;
}

export default function CollectionItemsActivity({
  collectionAddress,
  collectionTokensInitialData,
  toggleFiltersPanel,
}: CollectionItemsActivityProps) {
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

  return (
    <div className="flex">
      <div className="w-full">
        <CollectionItemsActivityHeader
          activeTab={activeTab}
          className={cn(
            "sticky z-10 bg-background px-5 pb-4 sm:py-6 sm:pt-4",
            "top-[var(--site-header-height)]",
            "md:top-[calc(var(--site-header-height)+var(--collection-header-height))]",
          )}
          onTabChange={setActiveTab}
        >
          {activeTab === "items" && (
            <CollectionItemsToolsBar
              toggleFiltersPanel={toggleFiltersPanel}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewType={viewType}
              setViewType={setViewType}
              totalTokensCount={collectionTokensInitialData.token_count}
            />
          )}
          {activeTab === "activity" && <p>Coming</p>}
        </CollectionItemsActivityHeader>
        <LiveResultsIndicator
          className="p-6 lg:hidden"
          totalCount={collectionTokensInitialData.token_count}
        />

        <div
          className={cn(
            "min-h-[calc(100vh-var(--site-header-height)-var(--collection-header-height)-var(--collection-footer-height))] pb-6",
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
