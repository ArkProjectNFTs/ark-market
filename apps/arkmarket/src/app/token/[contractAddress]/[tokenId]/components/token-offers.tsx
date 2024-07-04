"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Meh } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";

import type { TokenMarketData } from "~/types";
import { getTokenOffers } from "../queries/getTokenData";
import TokenOffersTable from "./token-offers-table";

interface TokenOffersProps {
  contractAddress: string;
  tokenId: string;
  owner: string;
  tokenMarketData: TokenMarketData | null;
}

export default function TokenOffers({
  className,
  contractAddress,
  owner,
  tokenId,
  tokenMarketData,
}: PropsWithClassName<TokenOffersProps>) {
  const [open, setOpen] = useState(true);

  const { data: infiniteData } = useInfiniteQuery({
    queryKey: ["tokenOffers", contractAddress, tokenId],
    refetchInterval: 10_000,
    // getNextPageParam: (lastPage) => lastPage.next_page,
    getNextPageParam: () => null,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getTokenOffers({ contractAddress, tokenId, page: pageParam }),
  });

  const tokenOffers = useMemo(
    () => infiniteData?.pages.flatMap((page) => page?.data ?? []) ?? [],
    [infiniteData],
  );

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
          <h3 className="text-2xl font-semibold">Offers</h3>
          <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm text-secondary-foreground">
            {tokenOffers.length}
          </div>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-sm">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        {tokenOffers.length > 0 ? (
          <TokenOffersTable
            tokenOffers={tokenOffers}
            owner={owner}
            tokenContractAdress={contractAddress}
            tokenId={tokenId}
            tokenMarketData={tokenMarketData}
          />
        ) : (
          <div className="flex flex-col items-center pb-8 text-muted-foreground">
            <Meh size={42} className="flex-shrink-0" />
            <p className="mt-3 text-center text-xl font-semibold">
              No offers yet!
              <br />
              Make the first offers!
            </p>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
