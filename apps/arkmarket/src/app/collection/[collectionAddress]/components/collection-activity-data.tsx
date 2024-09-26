"use client";

import { useMemo } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { CollectionActivityApiResponse } from "~/lib/getCollectionActivity";
import type { ActivityType } from "~/types";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getCollectionActivity } from "~/lib/getCollectionActivity";
import DesktopCollectionActivityData from "./desktop-collection-activity";
import MobileCollectionActivity from "./mobile-collection-activity";

interface CollectionProps {
  collectionAddress: string;
  collectionTokenCount: number;
  filters: ActivityType[];
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
