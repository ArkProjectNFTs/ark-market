"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ShoppingBag, Tag, TimerReset } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import { cn, ellipsableStyles, formatUnits } from "@ark-market/ui/lib/utils";

import useIsSSR from "~/hooks/useIsSSR";
import TokenActionsBar from "./token-actions-bar";

const data = { price: 540000000000000000n, isOwner: false };

export default function TokenActions({ className }: PropsWithClassName) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isActionItemsInView = useInView(ref, { margin: "-72px 0px 0px 0px" });
  const isSSR = useIsSSR();
  const shouldShowTokenActionsTopBar = !isSSR && !isActionItemsInView;

  return (
    <>
      <div
        className={cn(
          "rounded-lg bg-card p-5 lg:px-8 lg:pb-10 lg:pt-8",
          className,
        )}
      >
        <div className="flex flex-col-reverse gap-6 font-medium text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <p>Best Price</p>
          <div className="flex items-center gap-1.5">
            <TimerReset />
            <p>Time Left 12d 13h 45m</p>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-6 lg:mt-4 lg:justify-start">
          <div className="flex items-center gap-3 lg:gap-6">
            <p
              className={cn(
                "text-xl font-semibold lg:text-3xl",
                ellipsableStyles,
              )}
            >
              {formatUnits(data.price, 18)} ETH
            </p>
            <p className="text-lg font-semibold text-muted-foreground lg:text-2xl">
              $158.86
            </p>
          </div>
          <div className="flex h-8 items-center whitespace-nowrap rounded-full bg-secondary px-3 text-xs text-secondary-foreground lg:text-sm">
            Royalties _%
          </div>
        </div>

        <div
          className="mt-9 flex flex-col items-center gap-4 lg:flex-row lg:gap-8"
          ref={ref}
        >
          <Button className="relative w-full" size="xl">
            <ShoppingBag size={24} className="absolute left-4" />
            Buy now for {formatUnits(data.price, 18)} ETH
          </Button>
          <Button className="relative w-full" variant="secondary" size="xl">
            <Tag size={24} className="absolute left-4" />
            Make Offer
          </Button>
        </div>
      </div>
      {shouldShowTokenActionsTopBar && <TokenActionsBar />}
    </>
  );
}