"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@ark-market/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/components/collapsible";
import { formatUnits } from "@ark-market/ui/lib/utils";

const traitsData = [
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
];

export default function TokenTraits() {
  return (
    <Collapsible className="rounded-lg border border-border px-6" defaultOpen>
      <div className="flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-semibold">Traits</h2>
          <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm text-secondary-foreground">
            {traitsData.length}
          </div>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-small">
            <ChevronDown size={14} />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] gap-2 pb-6">
          {traitsData.map((data, index) => {
            return (
              <div className="rounded-lg bg-card p-3.5" key={index}>
                <p className="text-sm font-medium text-muted-foreground">
                  {data.trait}
                </p>
                <p className="text-lg font-semibold">{data.name}</p>
                <p className="mt-2 text-sm font-medium">
                  {formatUnits(data.price, 18)}{" "}
                  <span className="text-muted-foreground">ETH</span>
                </p>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
