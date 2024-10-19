"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import { ChevronDown, ChevronUp, NoOffer } from "@ark-market/ui/icons";

import type { Token, TokenMarketData } from "~/types";
import TokenOfferList from "./token-offers-list";
import TokenOffersTable from "./token-offers-table";
import useTokenOffers from "~/hooks/useTokenOffers";

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
  } = useTokenOffers({ token })
   
    
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

  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
          <h3 className="font-display text-2xl font-semibold">Offers</h3>
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
        {tokenOffers.length === 0 ? (
          <div className="flex flex-col items-center pb-8 text-muted-foreground">
            <NoOffer size={42} className="flex-shrink-0" />
            <p className="mt-3 text-center text-xl font-semibold">
              No offers yet!
              <br />
              Make the first offers!
            </p>
          </div>
        ) : (
          <>
            {isDesktop ? (
              <TokenOffersTable
                tokenOffers={tokenOffers}
                token={token}
                tokenMarketData={tokenMarketData}
              />
            ) : (
              <TokenOfferList
                tokenOffers={tokenOffers}
                token={token}
                tokenMarketData={tokenMarketData}
              />
            )}
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
