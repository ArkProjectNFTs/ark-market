"use client";

import { useMemo } from "react";

import type { ActivityType } from "~/types";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import DesktopPortfolioActivity from "./desktop-portfolio-activity";
import MobilePortfolioActivity from "./mobile-portfolio-activity";
import useWalletActivity from "~/hooks/useWalletActivity";

interface PortfolioActivityDataProps {
  walletAddress: string;
  activityFilters: ActivityType[];
}

export default function PortfolioActivityData({
  walletAddress,
  activityFilters,
}: PortfolioActivityDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWalletActivity({ activityFilters, walletAddress })

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
