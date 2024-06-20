"use client";

import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import type { WalletTokensApiResponse } from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import useIsSSR from "~/hooks/useIsSSR";
import { getWalletTokens } from "../queries/getWalletData";
import {
  walletCollectionFilterKey,
  walletCollectionFilterParser,
} from "../search-params";
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
  const [collectionFilter, _] = useQueryState(
    walletCollectionFilterKey,
    walletCollectionFilterParser,
  );
  const isSSR = useIsSSR();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletTokens", collectionFilter, walletAddress],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialData: isSSR
      ? {
          pages: [walletTokensInitialData],
          pageParams: [],
        }
      : undefined,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletTokens({
        page: pageParam,
        walletAddress,
        collectionAddress: collectionFilter,
      }),
  });

  useInfiniteWindowScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const walletTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data),
    [infiniteData],
  );
  if (walletTokens === undefined) {
    return;
  }
  if (viewType === "list") {
    return <PortfolioItemsDataListView walletTokens={walletTokens} />;
  }

  return (
    <div className="mb-6">
      <PortfolioItemsDataGridView
        key={collectionFilter}
        walletTokens={walletTokens}
        viewType={viewType}
      />
    </div>
  );
}
