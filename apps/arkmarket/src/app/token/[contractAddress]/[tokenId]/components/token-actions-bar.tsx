import { ShoppingBag, Tag } from "lucide-react";

import { Button } from "@ark-market/ui/button";

import type { TokenInfosApiResponse } from "../queries/getTokenData";
import Media from "~/components/media";

interface TokenActionsBar {
  tokenInfos: TokenInfosApiResponse["data"];
}

export default function TokenActionsBar({ tokenInfos }: TokenActionsBar) {
  return (
    <div className="fixed left-0 top-0 z-50 hidden h-[var(--site-header-height)] w-full items-center justify-between border-b border-border bg-background px-8 lg:flex">
      <div className="flex items-center gap-3.5">
        <Media
          src={tokenInfos.metadata?.animation_url ?? tokenInfos.metadata?.image}
          mediaKey={
            tokenInfos.metadata?.animation_key ?? tokenInfos.metadata?.image_key
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
    </div>
  );
}
