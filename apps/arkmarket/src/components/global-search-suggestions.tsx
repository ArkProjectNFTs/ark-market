"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn, focusableStyles, formatNumber } from "@ark-market/ui";
import { CommandGroup, CommandItem } from "@ark-market/ui/command";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import { homepageConfig } from "~/config/homepage";
import Media from "./media";

interface GlobalSearchSuggestionsProps {
  onClose: () => void;
}

// TODO: Implement recent search
export default function GlobalSearchSuggestions({
  onClose,
}: GlobalSearchSuggestionsProps) {
  const router = useRouter();

  return (
    <CommandGroup forceMount>
      <p className="text-sm font-medium text-muted-foreground">
        Best Collections
      </p>
      <div className="mt-4 flex flex-col gap-2.5">
        {homepageConfig.trendingNow.slice(0, 3).map((collection) => {
          return (
            <CommandItem
              key={`${collection.address}-${collection.name}`}
              className="flex cursor-pointer items-center gap-2 rounded-xs bg-transparent p-2 transition-colors"
              asChild
              onSelect={() => {
                router.push(`/collection/${collection.address}`);
                onClose();
              }}
            >
              <Link
                className={cn(focusableStyles)}
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
                    <VerifiedIcon className="size-3 text-background" />
                  </div>
                  <div className="flex items-center">
                    <EthereumLogo2 className="-ml-1 size-4" />
                    <p className="text-xs font-medium text-muted-foreground">
                      {formatNumber(collection.token_count)} items
                    </p>
                  </div>
                </div>
              </Link>
            </CommandItem>
          );
        })}
      </div>
    </CommandGroup>
  );
}
