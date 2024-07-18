import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { Token } from "~/types";
import Media from "~/components/media";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeOffer from "./token-actions-make-offer";

interface TokenActionsBarEmpty {
  show: boolean;
  token: Token;
  isOwner: boolean;
}

export default function TokenActionsBarEmpty({
  className,
  show,
  token,
  isOwner,
}: PropsWithClassName<TokenActionsBarEmpty>) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ transform: "translateY(-100%)" }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(-100%)" }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={cn(
            "fixed left-0 top-0 z-50 flex h-[var(--site-header-height)] w-full items-center justify-between border-b border-border bg-background px-8",
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
          <div className="flex gap-5">
            {isOwner ? (
              <TokenActionsCreateListing token={token} small />
            ) : (
              <TokenActionsMakeOffer token={token} small />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
