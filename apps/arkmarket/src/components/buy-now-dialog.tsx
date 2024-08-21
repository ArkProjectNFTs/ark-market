import { LoaderCircle } from "lucide-react";
import { formatEther } from "viem";

import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent } from "@ark-market/ui/dialog";
import { Typography } from "@ark-market/ui/typography";

import type { CollectionToken, Token } from "~/types";
import TokenActionsTokenOverview from "~/app/token/[contractAddress]/[tokenId]/components/token-actions-token-overview";

interface BuyNowDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isSuccess: boolean;
  token: Token | CollectionToken;
  price?: string;
}

export default function BuyNowDialog({
  isOpen,
  setIsOpen,
  isSuccess,
  token,
  price,
}: BuyNowDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="justify-normal lg:justify-center"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-10 sm:gap-8">
          <div className="flex flex-col gap-4">
            <div className="mx-auto mt-6 size-20 rounded-full bg-slate-800" />
            <div className="mb-5 text-center text-xl font-semibold sm:mb-0">
              {isSuccess
                ? "Congratulations for your purchase"
                : "Confirm your purchase"}
            </div>
            {isSuccess && (
              <div className="mb-4 text-center text-sm">
                Nice purchase, this NFT is now in your wallet ;)
              </div>
            )}
          </div>
          <TokenActionsTokenOverview
            token={token}
            amount={formatEther(BigInt(price ?? 0))}
          />
          {isSuccess ? (
            <Button
              onClick={() => setIsOpen(false)}
              size="xl"
              className="mx-auto w-full lg:w-fit"
            >
              Continue to explore NFTs
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-md bg-card p-5 lg:flex-row lg:gap-5 lg:p-4">
              <LoaderCircle className="size-10 animate-spin" />

              <div className="text-center lg:text-left">
                <Typography variant="body_bold_m">
                  Checking your payment
                </Typography>
                <div className="text-sm">
                  Checking your payment can take a few seconds...
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
