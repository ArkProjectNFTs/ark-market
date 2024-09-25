"use client";

import { useMemo } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type {
  PortfolioOffersApiResponse,
  PortfolioOffersTypeValues,
} from "~/lib/getPortfolioOffers";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getPortfolioOffers } from "~/lib/getPortfolioOffers";
import DesktopPortfolioOffers from "./desktop-portfolio-offers";
import MobilePortfolioOffers from "./mobile-portfolio-offers";

interface PortfolioActivityDataProps {
  walletAddress: string;
  offerType: PortfolioOffersTypeValues;
  isOwner: boolean;
}

export default function PortfolioOffersData({
  walletAddress,
  offerType,
  isOwner,
}: PortfolioActivityDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletOffers", walletAddress, offerType],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: PortfolioOffersApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPortfolioOffers({
        page: pageParam,
        walletAddress,
        offerType,
      }),
  });

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const portfolioOffers = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  console.log(portfolioOffers);

  return (
    <div>
      <div className="hidden md:block">
        <DesktopPortfolioOffers
          portfolioOffers={portfolioOffers}
          isOwner={isOwner}
          offerType={offerType}
        />
      </div>
      <div className="md:hidden">
        <MobilePortfolioOffers
          portfolioOffers={portfolioOffers}
          isOwner={isOwner}
          offerType={offerType}
        />
      </div>
    </div>
  );
}
