"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@ark-market/ui/lib/utils";

import type {
  CollectionInfosApiResponse,
  CollectionTokensApiResponse,
} from "../queries/getCollectionData";
import { getCollectionInfos } from "../queries/getCollectionData";
import CollectionBanner from "./collection-banner";
import CollectionFooter from "./collection-footer";
import CollectionHeader from "./collection-header";
import CollectionItemsActivity from "./collection-items-activity";
import CollectionItemsFiltersPanel from "./collection-items-filters-panel";
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
  const { data: collectionInfos } = useQuery({
    queryKey: ["collectionInfos"],
    refetchInterval: 10_000,
    initialData: collectionInfosInitialData,
    queryFn: () => getCollectionInfos({ collectionAddress }),
  });

  const [filtersPanelOpen, setFiltersPanelOpen] = useState(true);

  return (
    <main className="flex">
      <CollectionItemsFiltersPanel
        className="sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height))] sm:block"
        filtersOpen={filtersPanelOpen}
      />
      <div className="w-full">
        <CollectionBanner
          className="hidden md:block"
          collectionAddress={collectionAddress}
        />

        <CollectionHeader
          collectionAddress={collectionAddress}
          className="sticky top-[var(--site-header-height)] z-20 hidden md:block"
          collectionInfos={collectionInfos}
        />
        <MobileCollectionHeader
          className="md:hidden"
          collectionAddress={collectionAddress}
          collectionInfos={collectionInfos}
        />

        <CollectionItemsActivity
          collectionAddress={collectionAddress}
          collectionTokensInitialData={collectionTokensInitialData}
          toggleFiltersPanel={() =>
            setFiltersPanelOpen((previous) => !previous)
          }
        />
        <CollectionFooter className="sticky bottom-0 z-10 hidden md:flex" />
      </div>
    </main>
  );
}
