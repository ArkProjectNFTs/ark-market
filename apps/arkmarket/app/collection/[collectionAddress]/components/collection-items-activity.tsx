"use client";

import { useState } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import type { CollectionTokensApiResponse } from "../queries/getCollectionData";
import type { ViewType } from "./view-type-toggle-group";
import { siteHeaderRemHeight } from "~/components/site-header";
import {
  collectionSortByKey,
  collectionSortByParser,
  collectionSortDirectionKey,
  collectionSortDirectionsParser,
} from "../../search-params";
import { collectionFooterRemHeight } from "./collection-footer";
import { collectionHeaderRemHeight } from "./collection-header";
import CollectionItemsActivityHeader from "./collection-items-activity-header";
import CollectionItemsData from "./collection-items-data";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsToolsBar from "./collection-items-tools-bar";

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
        className="sticky z-10"
        filtersOpen={itemsFiltersOpen && canShowItemsFilter}
        style={{
          top: `${siteHeaderRemHeight + collectionHeaderRemHeight}rem`,
          height: `calc(100vh - ${siteHeaderRemHeight + collectionHeaderRemHeight + collectionFooterRemHeight}rem)`,
        }}
      />

      <div className="w-full">
        <CollectionItemsActivityHeader
          activeTab={activeTab}
          className="sticky z-10 bg-background p-6"
          onTabChange={setActiveTab}
          style={{
            top: `${siteHeaderRemHeight + collectionHeaderRemHeight}rem`,
          }}
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

        <div
          style={{
            minHeight: `calc(100vh - ${siteHeaderRemHeight + collectionHeaderRemHeight + collectionFooterRemHeight}rem)`,
          }}
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
