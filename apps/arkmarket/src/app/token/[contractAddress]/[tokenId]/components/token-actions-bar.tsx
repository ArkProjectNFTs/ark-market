import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Tag } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { TokenInfosApiResponse } from "../queries/getTokenData";
import Media from "~/components/media";

interface TokenActionsBar {
  show: boolean;
  tokenInfos: TokenInfosApiResponse["data"];
}

export default function TokenActionsBar({
  className,
  show,
  tokenInfos,
}: PropsWithClassName<TokenActionsBar>) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ transform: "translateY(-100%)" }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(-100%)" }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={cn(
            "fixed left-0 top-0 z-50 h-[var(--site-header-height)] w-full items-center justify-between border-b border-border bg-background px-8",
            className,
          )}
        >
          <div className="flex items-center gap-3.5">
            <Media
              src={
                tokenInfos.metadata?.animation_url ?? tokenInfos.metadata?.image
              }
              mediaKey={
                tokenInfos.metadata?.animation_key ??
                tokenInfos.metadata?.image_key
              }
              alt={tokenInfos.metadata?.name ?? `${tokenInfos.collection_name}`}
              className="size-12 rounded-xs"
            />
            <p className="text-lg font-semibold">{tokenInfos.metadata?.name}</p>
          </div>
          <div className="flex items-center gap-5">
            <Button>
              <ShoppingBag size={24} />
              Buy now for 0.054 ETH
            </Button>
            <Button variant="secondary">
              <Tag size={24} />
              Make Offer
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
