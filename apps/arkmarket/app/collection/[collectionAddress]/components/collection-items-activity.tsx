"use client";

import { useState } from "react";

import { siteHeaderRemHeight } from "~/components/site-header";
import { collectionFooterRemHeight } from "./collection-footer";
import { collectionHeaderRemHeight } from "./collection-header";
import CollectionItemsActivityHeader from "./collection-items-activity-header";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
import CollectionItemsToolsBar from "./collection-items-tools-bar";

export default function CollectionItemsActivity() {
  const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);
  // TODO @YohanTz: Get State from URL query params
  const [activeTab, setActiveTab] = useState("items");

  const canShowItemsFilter = activeTab === "items";

  return (
    <div className="flex">
      <CollectionItemsFiltersPanel
        className="sticky"
        filtersOpen={itemsFiltersOpen && canShowItemsFilter}
        style={{
          top: `${siteHeaderRemHeight + collectionHeaderRemHeight}rem`,
          height: `calc(100vh - ${siteHeaderRemHeight + collectionHeaderRemHeight + collectionFooterRemHeight}rem)`,
        }}
      />

      <div className="w-full">
        <CollectionItemsActivityHeader
          activeTab={activeTab}
          className="sticky bg-background p-6"
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
            />
          )}
          {activeTab === "activity" && <p>Coming soon...</p>}
        </CollectionItemsActivityHeader>

        <div
          style={{
            minHeight: `calc(100vh - ${siteHeaderRemHeight + collectionHeaderRemHeight + collectionFooterRemHeight}rem)`,
          }}
        >
          {activeTab === "items" && <div className="h-[200vh] bg-secondary" />}
        </div>
      </div>
    </div>
  );
}
