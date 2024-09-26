"use client";

import { useMemo, useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { CollectionActivityApiResponse } from "~/lib/getCollectionActivity";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getCollectionActivity } from "~/lib/getCollectionActivity";
import { ActivityType } from "~/types";
import CollectionActivityFiltersPanel from "./collection-activity-filters-panel";
import DesktopCollectionActivityData from "./desktop-collection-activity";
import MobileCollectionActivity from "./mobile-collection-activity";

interface CollectionProps {
  collectionAddress: string;
  collectionTokenCount: number;
  filters: Array<ActivityType>;
}

export default function CollectionActivityData({
  collectionAddress,
  filters,
}: CollectionProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["collectionActivity", collectionAddress, ...filters],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: CollectionActivityApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getCollectionActivity({
        page: pageParam,
        collectionAddress,
        activityFilters: filters,
      }),
  });
  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const collectionActivity = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <DesktopCollectionActivityData
          collectionAddress={collectionAddress}
          collectionActivity={collectionActivity}
        />
      </div>
      <div className="md:hidden">
        <MobileCollectionActivity collectionActivity={collectionActivity} />
      </div>
    </div>
  );
}
