import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Typography } from "@ark-market/ui/typography";

import type { Token, TokenMarketData } from "~/types";
import Media from "~/components/media";
import TokenActionsAcceptBestOffer from "./token-actions-accept-best-offer";
import TokenActionsCancelListing from "./token-actions-cancel-listing";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeBid from "./token-actions-make-bid";
import TokenActionsMakeOffer from "./token-actions-make-offer";
import TokenActionsBuyNow from "./tokens-actions-buy-now";

interface TokenActionsBar {
  show: boolean;
  token: Token;
  tokenMarketData: TokenMarketData;
  isOwner: boolean;
  isListed: boolean;
  isAuction: boolean;
  hasOffers: boolean;
}

export default function TokenActionsBar({
  className,
  show,
  token,
  tokenMarketData,
  isOwner,
  isListed,
  isAuction,
  hasOffers,
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
            "fixed left-0 top-0 z-50 hidden h-[var(--site-header-height)] w-full items-center justify-between border-b border-border bg-background px-8 lg:flex",
            className,
          )}
        >
          <div className="flex items-center gap-3.5">
            <Media
              src={token.metadata?.animation_url ?? token.metadata?.image}
              mediaKey={token.metadata?.image_key}
              alt={token.metadata?.name ?? `${token.collection_name}`}
              className="size-12 rounded-xs"
            />
            <Typography variant="body_bold_m">
              {token.metadata?.name}
            </Typography>
          </div>
          <div className="flex gap-5">
            {isOwner ? (
              <>
                {isListed ? (
                  <>
                    {hasOffers && (
                      <TokenActionsAcceptBestOffer
                        token={token}
                        tokenMarketData={tokenMarketData}
                        isAuction={isAuction}
                        small
                      />
                    )}
                    <TokenActionsCancelListing
                      token={token}
                      tokenMarketData={tokenMarketData}
                      small
                    />
                  </>
                ) : (
                  <TokenActionsCreateListing token={token} small />
                )}
              </>
            ) : (
              <>
                {isListed ? (
                  <>
                    {isAuction ? (
                      <>
                        <TokenActionsMakeBid
                          token={token}
                          tokenMarketData={tokenMarketData}
                          small
                        />
                      </>
                    ) : (
                      <>
                        <TokenActionsBuyNow
                          token={token}
                          tokenMarketData={tokenMarketData}
                          small
                        />
                        <TokenActionsMakeOffer token={token} small />
                      </>
                    )}
                  </>
                ) : (
                  <TokenActionsMakeOffer token={token} small />
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
