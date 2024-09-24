"use client";

import { useState } from "react";
import Link from "next/link";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, focusableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import { ChevronDown, ChevronUp, NoTraits } from "@ark-market/ui/icons";

import type { TokenMetadata } from "~/types";

interface TokenTraitsProps {
  contractAddress: string;
  tokenAttributes: TokenMetadata["attributes"];
}

export default function TokenTraits({
  className,
  contractAddress,
  tokenAttributes,
}: PropsWithClassName<TokenTraitsProps>) {
  const [open, setOpen] = useState(true);

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
          <h3 className="text-2xl font-semibold">Traits</h3>
          <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm text-secondary-foreground">
            {tokenAttributes.length}
          </div>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-sm">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        {true ? (
          // {TokenTraits.length === 0 ? (
          <div className="flex flex-col items-center pb-8 text-muted-foreground">
            <NoTraits size={42} className="flex-shrink-0" />
            <p className="mt-3 text-center text-xl font-semibold">
              No metadata!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 pb-6 sm:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))]">
            {tokenAttributes.map((tokenAttribute, index) => {
              const collectionFilter = {
                traits: {
                  [tokenAttribute.trait_type ?? ""]: [tokenAttribute.value],
                },
              };
              return (
                <Link
                  className={cn("rounded-lg bg-card p-3.5", focusableStyles)}
                  key={index}
                  href={`/collection/${contractAddress}?filters=${encodeURIComponent(JSON.stringify(collectionFilter))}`}
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    {tokenAttribute.trait_type}
                  </p>
                  <p className="text-lg font-semibold">
                    {tokenAttribute.value}
                  </p>
                  {/* <p className="mt-2 text-sm font-medium">
                  {formatUnits(data.price, 18)}{" "}
                  <span className="text-muted-foreground">ETH</span>
                </p> */}
                </Link>
              );
            })}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
