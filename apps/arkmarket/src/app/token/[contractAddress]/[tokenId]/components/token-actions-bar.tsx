import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Tag } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { Token } from "~/types";
import Media from "~/components/media";

interface TokenActionsBar {
  show: boolean;
  token: Token;
}

export default function TokenActionsBar({
  className,
  show,
  token,
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
              src={token.metadata?.animation_url ?? token.metadata?.image}
              mediaKey={
                token.metadata?.animation_key ?? token.metadata?.image_key
              }
              alt={token.metadata?.name ?? `${token.collection_name}`}
              className="size-12 rounded-xs"
            />
            <p className="text-lg font-semibold">{token.metadata?.name}</p>
          </div>
          <div className="flex items-center gap-5">
            <Button size="xl">
              <ShoppingBag size={24} />
              Buy now for 0.054 ETH
            </Button>
            <Button variant="secondary" size="xl">
              <Tag size={24} />
              Make Offer
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
