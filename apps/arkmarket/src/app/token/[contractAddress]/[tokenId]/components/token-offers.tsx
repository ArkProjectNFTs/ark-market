"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Meh } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";

export default function TokenOffers({ className }: PropsWithClassName) {
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
        <h3 className="text-2xl font-semibold">Offers</h3>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-small">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
