"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { WalletTokensApiResponse } from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
import { getWalletTokens } from "../queries/getWalletData";

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
  const { data: infiniteData } = useInfiniteQuery({
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

  const walletTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data),
    [infiniteData],
  );

  return <div></div>;
}
