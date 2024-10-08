"use client";

import { useMemo } from "react";

import type {
  PortfolioOffersTypeValues,
} from "~/lib/getPortfolioOffers";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import DesktopPortfolioOffers from "./desktop-portfolio-offers";
import MobilePortfolioOffers from "./mobile-portfolio-offers";
import useWalletOffers from "~/hooks/useWalletOffers";

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
  } = useWalletOffers({ offerType, walletAddress })

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
