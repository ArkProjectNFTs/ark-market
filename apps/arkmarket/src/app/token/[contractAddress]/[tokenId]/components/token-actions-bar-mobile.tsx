import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { Token, TokenMarketData } from "~/types";
import TokenActionsBuyNow from "./tokens-actions-buy-now";

interface TokenActionsBarMobileProps {
  show: boolean;
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsBarMobile({
  show,
  token,
  tokenMarketData,
  className,
}: PropsWithClassName<TokenActionsBarMobileProps>) {
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
          <TokenActionsBuyNow token={token} tokenMarketData={tokenMarketData} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
