"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { WalletTokensApiResponse } from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getWalletTokens } from "../queries/getWalletData";
import PortfolioItemsDataGridView from "./portfolio-items-data-grid-view";
import PortfolioItemsDataListView from "./portfolio-items-data-list-view";

interface PortfolioItemsDataProps {
  walletTokensInitialData: WalletTokensApiResponse;
  viewType: ViewType;
  walletAddress: string;
}

export default function PortfolioItemsData({
  viewType,
  walletTokensInitialData,
  walletAddress,
}: PortfolioItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletTokens"],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialData: {
      pages: [walletTokensInitialData],
      pageParams: [],
    },
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletTokens({ page: pageParam, walletAddress }),
  });

  useInfiniteWindowScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const walletTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data),
    [infiniteData],
  );

  if (viewType === "list") {
    return <PortfolioItemsDataListView walletTokens={walletTokens} />;
  }

  return (
    <PortfolioItemsDataGridView
      walletTokens={walletTokens}
      viewType={viewType}
    />
  );
}
