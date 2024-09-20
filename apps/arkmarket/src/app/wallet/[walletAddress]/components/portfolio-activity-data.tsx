"use client";

import { useMemo } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { PortfolioActivityApiResponse } from "~/lib/getPortfolioActivity";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getPortfolioActivity } from "~/lib/getPortfolioActivity";
import DesktopPortfolioActivity from "./desktop-portfolio-activity";
import MobilePortfolioActivity from "./mobile-portfolio-activity";

interface PortfolioActivityDataProps {
  walletAddress: string;
}

export default function PortfolioActivityData({
  walletAddress,
}: PortfolioActivityDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletActivity", walletAddress],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: PortfolioActivityApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPortfolioActivity({
        page: pageParam,
        walletAddress,
      }),
  });

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const portfolioActivity = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  return (
    <div>
      <div className="hidden md:block">
        <DesktopPortfolioActivity portfolioActivity={portfolioActivity} />
      </div>
      <div className="md:hidden">
        <MobilePortfolioActivity portfolioActivity={portfolioActivity} />
      </div>
    </div>
  );
}
