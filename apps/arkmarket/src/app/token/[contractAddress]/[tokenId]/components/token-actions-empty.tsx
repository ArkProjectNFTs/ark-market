"use client";

import { Meh } from "lucide-react";

import type { Token } from "~/types";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeOffer from "./token-actions-make-offer";

interface TokenActionsEmptyProps {
  token: Token;
  isOwner: boolean;
}

export default function TokenActionsEmpty({
  token,
  isOwner,
}: TokenActionsEmptyProps) {
  return (
    <div className="rounded-lg bg-card p-5 text-center lg:px-8 lg:pb-10 lg:pt-8">
      <div className="flex flex-col items-center pb-8 text-muted-foreground">
        <Meh size={42} className="flex-shrink-0" />
        <p className="mt-3 text-center text-xl font-semibold">
          {isOwner
            ? "You have not assigned a price to your token yet."
            : "This token has not been listed yet."}
        </p>
      </div>
      {isOwner ? (
        <TokenActionsCreateListing token={token} />
      ) : (
        <TokenActionsMakeOffer token={token} />
      )}
    </div>
  );
}
