"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Meh } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import { Typography } from "@ark-market/ui/typography";

import type { TokenOffersApiResponse } from "~/lib/getTokenOffers";
import type { Token, TokenMarketData } from "~/types";
import { getTokenOffers } from "~/lib/getTokenOffers";
import TokenOffersMobileTable from "./token-offers-mobile-table";
import TokenOffersTable from "./token-offers-table";

interface TokenOffersProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenOffers({
  className,
  token,
  tokenMarketData,
}: PropsWithClassName<TokenOffersProps>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);
  const {
    data: infiniteData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["tokenOffers", token.collection_address, token.token_id],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage: TokenOffersApiResponse) => lastPage.next_page,
    placeholderData: keepPreviousData,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getTokenOffers({
        contractAddress: token.collection_address,
        tokenId: token.token_id,
        page: pageParam,
      }),
  });
  const offersCount = infiniteData?.pages[0]?.count ?? 0;
  const tokenOffers = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 150 &&
          !isFetching &&
          hasNextPage
        ) {
          void fetchNextPage();
        }
      }
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  return (
    <Collapsible
      className={cn(
        "rounded-none border-t border-border px-6 lg:rounded-lg lg:border",
        className,
      )}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Typography asChild variant="h3">
            <h3>Offers</h3>
          </Typography>
          <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm text-secondary-foreground">
            {offersCount}
          </div>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-sm">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent
        className="max-h-[26rem] overflow-auto data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]"
        ref={tableContainerRef}
        onScroll={(event) =>
          fetchMoreOnBottomReached(event.target as HTMLDivElement)
        }
      >
        {tokenOffers.length > 0 ? (
          <>
            <TokenOffersTable
              tokenOffers={tokenOffers}
              token={token}
              tokenMarketData={tokenMarketData}
            />
            <TokenOffersMobileTable
              tokenOffers={tokenOffers}
              token={token}
              tokenMarketData={tokenMarketData}
            />
          </>
        ) : (
          <div className="flex flex-col items-center pb-8 text-muted-foreground">
            <Meh size={42} className="flex-shrink-0" />
            <Typography className="mt-3 text-center" variant="h4">
              No offers yet!
              <br />
              Make the first offers!
            </Typography>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
