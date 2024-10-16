"use client";

import { useMemo } from "react";

import type { ActivityType } from "~/types";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import DesktopCollectionActivityData from "./desktop-collection-activity";
import MobileCollectionActivity from "./mobile-collection-activity";
import useCollectionActivity from "~/hooks/useCollectionActivity";

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
  } = useCollectionActivity({ collectionAddress, filters })
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
