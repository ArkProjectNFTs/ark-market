import { ShoppingBag, Tag } from "lucide-react";

import { Button } from "@ark-market/ui/components/button";

import Media from "~/components/media";

export default function TokenActionsBar() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-[var(--site-header-height)] w-full items-center justify-between border-b border-border bg-background px-8">
      <div className="flex items-center gap-3.5">
        <Media
          alt="Everai"
          src="https://media.arkproject.dev/ab43f917530bbfd33cb3d9d7ef92180d515c3b1bce8674b45a9ace6283ba5d43.mp4"
          className="size-12 rounded-xs"
        />
        <p className="text-lg font-semibold">Everai #2345</p>
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
