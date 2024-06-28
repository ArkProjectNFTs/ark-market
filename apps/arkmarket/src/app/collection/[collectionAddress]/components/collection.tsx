"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import type {
  CollectionInfosApiResponse,
  CollectionTokensApiResponse,
} from "../queries/getCollectionData";
import type { ViewType } from "~/components/view-type-toggle-group";
import { getCollectionInfos } from "../queries/getCollectionData";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "../search-params";
import CollectionBanner from "./collection-banner";
import CollectionHeader from "./collection-header";
import CollectionItemsActivityHeader from "./collection-items-activity-header";
import CollectionItemsData from "./collection-items-data";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsToolsBar from "./collection-items-tools-bar";
import MobileCollectionHeader from "./mobile-collection-header";

interface CollectionProps {
  collectionAddress: string;
  collectionInfosInitialData: CollectionInfosApiResponse;
  collectionTokensInitialData: CollectionTokensApiResponse;
}

export default function Collection({
  collectionAddress,
  collectionInfosInitialData,
  collectionTokensInitialData,
}: CollectionProps) {
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
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

  const { data: collectionInfos } = useQuery({
    queryKey: ["collectionInfos", collectionAddress],
    refetchInterval: 10_000,
    initialData: collectionInfosInitialData,
    queryFn: () => getCollectionInfos({ collectionAddress }),
  });

  const toggleFiltersPanel = () => setFiltersPanelOpen((previous) => !previous);

  return (
    <main className="flex min-h-[calc(100vh-var(--site-header-height))]">
      {activeTab === "items" && (
        <CollectionItemsFiltersPanel
          className="sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height))] sm:block"
          filtersOpen={filtersPanelOpen}
        />
      )}

      <div className="flex flex-1 flex-col">
        <CollectionBanner
          className="hidden md:block"
          collectionAddress={collectionAddress}
        />

        <MobileCollectionHeader
          className="md:hidden"
          collectionAddress={collectionAddress}
          collectionInfos={collectionInfos}
        />

        <div className="sticky top-[var(--site-header-height)] z-20 bg-background">
          <CollectionHeader
            collectionAddress={collectionAddress}
            className="hidden md:block"
            collectionInfos={collectionInfos}
          />
          <CollectionItemsActivityHeader
            activeTab={activeTab}
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
                totalTokensCount={collectionInfos.token_count}
              />
            )}
            {activeTab === "activity" && <p>Coming</p>}
          </CollectionItemsActivityHeader>
        </div>

        <div className="flex-1">
          {activeTab === "items" && (
            <CollectionItemsData
              collectionAddress={collectionAddress}
              collectionTokensInitialData={collectionTokensInitialData}
              totalTokensCount={collectionInfos.token_count}
              sortDirection={sortDirection}
              sortBy={sortBy}
              viewType={viewType}
            />
          )}
        </div>
      </div>
    </main>
  );
}
