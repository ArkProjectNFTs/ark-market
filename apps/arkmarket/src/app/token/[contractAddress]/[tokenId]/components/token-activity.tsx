"use client";

import { useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { TokenActivityApiResponse } from "~/lib/getTokenActivity";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import getTokenActivity, {
  tokenActivityFilterKey,
  TokenActivityFiltersParser,
} from "~/lib/getTokenActivity";
import DesktopTokenActivity from "./desktop-token-activity";
import MobileTokenActivity from "./mobile-token-activity";
import TokenActivityFilterSelect from "./token-activity-filter-select";

interface TokenActivityProps {
  contractAddress: string;
  tokenId: string;
}

export default function TokenActivity({
  className,
  contractAddress,
  tokenId,
}: PropsWithClassName<TokenActivityProps>) {
  const tableContainerRef = useRef<HTMLTableElement | null>(null);
  const [tokenActivityFilter] = useQueryState(
    tokenActivityFilterKey,
    TokenActivityFiltersParser,
  );

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tokenActivity", contractAddress, tokenId],
    refetchInterval: 10_000,
    // getNextPageParam: (lastPage) => lastPage.next_page,
    getNextPageParam: (lastPage?: TokenActivityApiResponse) =>
      lastPage?.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getTokenActivity({
        activityFilter: tokenActivityFilter,
        contractAddress,
        tokenId,
        page: pageParam,
      }),
  });

  const totalCount = infiniteData?.pages[0]?.count ?? 0;
  const tokenActivity = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // const rowVirtualizer = useWindowVirtualizer({
  //   // Approximate initial rect for SSR
  //   initialRect: { height: 1080, width: 1920 },
  //   count: tokenActivity.length,
  //   estimateSize: () => 75, // Estimation of row height for accurate scrollbar dragging
  //   // Measure dynamic row height, except in firefox because it measures table border height incorrectly
  //   measureElement:
  //     typeof window !== "undefined" && !navigator.userAgent.includes("Firefox")
  //       ? (element) => element.getBoundingClientRect().height
  //       : undefined,
  //   overscan: 5,
  //   scrollMargin: tableContainer.current?.offsetTop ?? 0,
  // });

  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-4 lg:gap-1.5">
        <h2 className="text-2xl font-semibold">Activity</h2>
        <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm font-medium text-secondary-foreground">
          {totalCount}
        </div>
      </div>
      <div className="mt-4">
        <TokenActivityFilterSelect />
      </div>
      <div className="mt-6 lg:mt-12" ref={tableContainerRef}>
        <div className="hidden lg:block">
          <DesktopTokenActivity tokenActivity={tokenActivity} />
        </div>
        <div className="lg:hidden">
          <MobileTokenActivity tokenActivity={tokenActivity} />
        </div>
      </div>
    </div>
  );
}
