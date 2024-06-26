"use client";

import { ChevronDown, Meh } from "lucide-react";

import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";

export default function TokenOffers() {
  return (
    // TODO @YohanTz: max-height?
    <Collapsible className="rounded-lg border border-border px-6" defaultOpen>
      <div className="flex h-[4.5rem] items-center justify-between">
        <h2 className="text-3xl font-semibold">Offers</h2>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-small">
            <ChevronDown size={14} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        <div className="flex flex-col items-center pb-8 text-muted-foreground">
          <Meh size={42} className="flex-shrink-0" />
          <p className="mt-3 text-center text-xl font-semibold">
            No offers yet!
            <br />
            Make the first offers!
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
