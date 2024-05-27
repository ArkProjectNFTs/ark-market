"use client";

import { useState } from "react";

import { siteHeaderRemHeight } from "~/components/site-header";
import CollectionFooter, {
  collectionFooterRemHeight,
} from "./collection-footer";
import { collectionHeaderRemHeight } from "./collection-header";
import Filters from "./filters";
import ToolsBar from "./tools-bar";

export default function TokensGridWithFilters() {
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <div className="flex">
      <Filters
        className="sticky"
        style={{
          top: `${siteHeaderRemHeight + collectionHeaderRemHeight}rem`,
          height: `calc(100vh - ${siteHeaderRemHeight + collectionHeaderRemHeight + collectionFooterRemHeight}rem)`,
        }}
        filtersOpen={filtersOpen}
      />
      <div className="w-full">
        <ToolsBar
          className="sticky"
          style={{
            top: `${siteHeaderRemHeight + collectionHeaderRemHeight}rem`,
          }}
          toggleFiltersOpen={() => setFiltersOpen((previous) => !previous)}
        />
        <div className="h-[200vh] bg-red-950" />
      </div>
    </div>
  );
}
