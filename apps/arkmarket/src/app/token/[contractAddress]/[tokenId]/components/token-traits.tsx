"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";

import type { TokenMetadata } from "../queries/getTokenData";

interface TokenTraitsProps {
  tokenAttributes: TokenMetadata["attributes"];
}

export default function TokenTraits({
  className,
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
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-semibold">Traits</h3>
          <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm text-secondary-foreground">
            {tokenAttributes.length}
          </div>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-small">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        <div className="grid grid-cols-2 gap-2 pb-6 sm:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))]">
          {tokenAttributes.map((tokenAttribute, index) => {
            return (
              <div className="rounded-lg bg-card p-3.5" key={index}>
                <p className="text-sm font-medium text-muted-foreground">
                  {tokenAttribute.trait_type}
                </p>
                <p className="text-lg font-semibold">{tokenAttribute.value}</p>
                {/* <p className="mt-2 text-sm font-medium">
                  {formatUnits(data.price, 18)}{" "}
                  <span className="text-muted-foreground">ETH</span>
                </p> */}
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
