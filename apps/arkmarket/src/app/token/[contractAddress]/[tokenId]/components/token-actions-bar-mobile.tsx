import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { Token, TokenMarketData } from "~/types";
import TokenActionsCancelListing from "./token-actions-cancel-listing";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeBid from "./token-actions-make-bid";
import TokenActionsMakeOffer from "./token-actions-make-offer";
import TokenActionsBuyNow from "./tokens-actions-buy-now";

interface TokenActionsBarMobileProps {
  show: boolean;
  token: Token;
  tokenMarketData: TokenMarketData;
  isListed: boolean;
  isAuction: boolean;
  isOwner: boolean;
}

export default function TokenActionsBarMobile({
  show,
  token,
  tokenMarketData,
  isListed,
  isAuction,
  isOwner,
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
          {isOwner ? (
            <>
              {isListed ? (
                <TokenActionsCancelListing
                  token={token}
                  tokenMarketData={tokenMarketData}
                />
              ) : (
                <TokenActionsCreateListing token={token} />
              )}
            </>
          ) : (
            <>
              {isListed ? (
                isAuction ? (
                  <TokenActionsMakeBid
                    token={token}
                    tokenMarketData={tokenMarketData}
                  />
                ) : (
                  <TokenActionsBuyNow
                    token={token}
                    tokenMarketData={tokenMarketData}
                  />
                )
              ) : (
                <TokenActionsMakeOffer token={token} />
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
