"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import type { ViewType } from "~/components/view-type-toggle-group";
import type { CollectionApiResponse } from "~/lib/getCollection";
import getCollection from "~/lib/getCollection";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "~/lib/getCollectionTokens";
import CollectionActivityData from "./collection-activity-data";
import CollectionBanner from "./collection-banner";
import CollectionHeader from "./collection-header";
import CollectionItemsActivityHeader from "./collection-items-activity-header";
import CollectionItemsData from "./collection-items-data";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsToolsBar from "./collection-items-tools-bar";
import MobileCollectionHeader from "./mobile-collection-header";

interface CollectionProps {
  collectionAddress: string;
  collectionInitialData: CollectionApiResponse;
  // collectionTokensInitialData: CollectionTokensApiResponse;
}

export default function Collection({
  collectionAddress,
  collectionInitialData,
  // collectionTokensInitialData,
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

  // TODO @YohanTz: Choose between local storage and URL query param
  const [viewType, setViewType] = useState<ViewType>("large-grid");

  const { data: collection } = useQuery({
    queryKey: ["collection", collectionAddress],
    refetchInterval: false,
    queryFn: () => getCollection({ collectionAddress }),
    initialData: collectionInitialData,
  });

  const totalTokensCount = collection.data.token_count;

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
          collection={collection.data}
        />
        <div className="sticky top-[var(--site-header-height)] z-20 bg-background">
          <CollectionHeader
            collectionAddress={collectionAddress}
            className="hidden md:block"
            collection={collection.data}
          />
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
                totalTokensCount={totalTokensCount}
              />
            )}
          </CollectionItemsActivityHeader>
        </div>

        <div className="flex-1">
          {activeTab === "items" && (
            <CollectionItemsData
              collectionAddress={collectionAddress}
              totalTokensCount={totalTokensCount}
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
    </main>
  );
}
