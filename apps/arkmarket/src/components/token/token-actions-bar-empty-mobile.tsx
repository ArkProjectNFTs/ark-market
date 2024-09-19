import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { Token } from "~/types";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeOffer from "./token-actions-make-offer";

interface TokenActionsBarEmptyMobileProps {
  show: boolean;
  token: Token;
  isOwner: boolean;
}

export default function TokenActionsBarEmptyMobile({
  show,
  token,
  isOwner,
  className,
}: PropsWithClassName<TokenActionsBarEmptyMobileProps>) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ transform: "translateY(4.25rem)" }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(4.25rem)" }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          className={cn(
            "fixed bottom-5 left-5 right-5 z-50 lg:hidden",
            className,
          )}
        >
          {isOwner ? (
            <TokenActionsCreateListing token={token} />
          ) : (
            <TokenActionsMakeOffer token={token} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
