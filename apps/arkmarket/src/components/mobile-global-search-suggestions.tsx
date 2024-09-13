import Link from "next/link";

import { cn, focusableStyles, formatNumber } from "@ark-market/ui";
import { Ethereum, VerifiedIcon } from "@ark-market/ui/icons";

import { homepageConfig } from "~/config/homepage";
import Media from "./media";

interface MobileGlobalSearchSuggestionsProps {
  onClose: () => void;
}

export default function MobileGlobalSearchSuggestions({
  onClose,
}: MobileGlobalSearchSuggestionsProps) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        Best Collections
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {homepageConfig.trendingNow.slice(0, 3).map((collection) => {
          return (
            <Link
              onClick={onClose}
              key={`${collection.address}-${collection.name}`}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xs bg-transparent p-2 transition-colors",
                focusableStyles,
              )}
              href={`/collection/${collection.address}`}
            >
              <Media
                src={collection.image}
                alt={collection.name}
                height={64}
                width={64}
                className="size-8 rounded-xs"
              />
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{collection.name}</p>
                  <VerifiedIcon className="size-3 text-primary" />
                </div>
                <div className="flex items-center">
                  <Ethereum className="-ml-1 size-4" />
                  <p className="text-xs font-medium text-muted-foreground">
                    {formatNumber(collection.token_count)} items
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
