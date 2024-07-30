"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Command as CommandPrimitive } from "cmdk";
import { Meh } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  formatNumber,
} from "@ark-market/ui";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ark-market/ui/command";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import getCollectionSearch from "~/lib/getCollectionSearch";
import GlobalSearchSuggestions from "./global-search-suggestions";
import Media from "./media";

interface GlobalSearchCommandsProps {
  inputValue: string;
  inputDebouncedValue: string;
  onClose: () => void;
}

function GlobalSearchCommands({
  inputValue,
  inputDebouncedValue,
  onClose,
}: GlobalSearchCommandsProps) {
  const { data: searchResults } = useQuery({
    queryKey: ["searchCollection", inputDebouncedValue],
    refetchInterval: false,
    placeholderData: keepPreviousData,
    queryFn: () => getCollectionSearch({ searchQuery: inputDebouncedValue }),
    enabled: inputDebouncedValue.length >= 3,
  });
  const router = useRouter();

  if (
    searchResults === undefined ||
    inputValue.length < 3 ||
    inputDebouncedValue.length < 3
  ) {
    return (
      <div className="px-4 pb-4 pt-5">
        <GlobalSearchSuggestions onClose={onClose} />
      </div>
    );
  }

  if (
    searchResults.data.collections.length === 0 &&
    searchResults.data.accounts.length === 0
  ) {
    return (
      <div className=" px-4 pb-4 pt-5">
        <div className="mb-8 flex flex-col items-center gap-3 text-muted-foreground">
          <Meh className="size-10" />
          <p className="pl-3 text-center text-xl font-semibold">
            Sorry, there are no results for your search.
          </p>
        </div>

        <GlobalSearchSuggestions onClose={onClose} />
      </div>
    );
  }

  return (
    <>
      {searchResults.data.collections.length > 0 && (
        <CommandGroup forceMount className="px-4 pb-4 pt-5">
          <p className="text-sm font-medium text-muted-foreground">
            Collections
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            {searchResults.data.collections.map((searchResult) => {
              return (
                <CommandItem
                  value={`${searchResult.address}-${searchResult.name}`}
                  key={`${searchResult.address}-${searchResult.name}`}
                  className="flex cursor-pointer items-center gap-2 rounded-xs bg-transparent p-2 transition-colors"
                  asChild
                  onSelect={() => {
                    router.push(`/collection/${searchResult.address}`);
                    onClose();
                  }}
                >
                  <Link
                    className={cn(focusableStyles)}
                    href={`/collection/${searchResult.address}`}
                    prefetch
                  >
                    <Media
                      src={searchResult.image}
                      alt={searchResult.name}
                      height={64}
                      width={64}
                      className="size-8 rounded-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">
                          {searchResult.name}
                        </p>
                        {searchResult.is_verified && (
                          <VerifiedIcon className="size-3 text-background" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <EthereumLogo2 className="-ml-1 size-4" />
                        <p className="text-xs font-medium text-muted-foreground">
                          {formatNumber(searchResult.token_count)} items
                        </p>
                      </div>
                    </div>
                  </Link>
                </CommandItem>
              );
            })}
          </div>
        </CommandGroup>
      )}
      {searchResults.data.accounts.length > 0 && (
        <CommandGroup forceMount className="px-4 pb-4 pt-5">
          <p className="text-sm font-medium text-muted-foreground">Accounts</p>
          <div className="mt-4 flex flex-col gap-2.5">
            {searchResults.data.accounts.map((searchResult) => {
              return (
                <CommandItem
                  value={`${searchResult.owner}`}
                  key={`${searchResult.owner}`}
                  className="flex cursor-pointer items-center gap-2 rounded-xs bg-transparent p-2 transition-colors"
                  asChild
                  onSelect={() => {
                    router.push(`/wallet/${searchResult.owner}`);
                    onClose();
                  }}
                >
                  <Link
                    className={cn(focusableStyles)}
                    href={`/wallet/${searchResult.owner}`}
                    prefetch
                  >
                    <Media
                      alt=""
                      height={64}
                      width={64}
                      className="size-8 rounded-full"
                    />
                    <p className={cn("text-sm font-medium", ellipsableStyles)}>
                      {searchResult.owner}
                    </p>
                  </Link>
                </CommandItem>
              );
            })}
          </div>
        </CommandGroup>
      )}
    </>
  );
}

export default function GlobalSearchWrapper() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputDebouncedValue, setInputDebouncedValue] = useDebounceValue(
    "",
    500,
  );

  const openSearch = () => setOpen(true);
  const closeSearch = () => {
    // Delay input close to let enough time to perform redirection if needed
    void new Promise((resolve) => setTimeout(resolve, 200)).then(() =>
      setOpen(false),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!inputRef.current) {
      return;
    }

    if (!open) {
      setOpen(true);
    }

    if (event.key === "Escape") {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        if (!inputRef.current) {
          return;
        }
        inputRef.current.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandPrimitive
      filter={() => 1}
      className="w-[30rem]"
      onKeyDown={handleKeyDown}
    >
      <CommandInput
        placeholder="Search Nft, collections and account..."
        onFocus={openSearch}
        onBlur={closeSearch}
        ref={inputRef}
        value={inputValue}
        onValueChange={(value) => {
          setInputDebouncedValue(value);
          setInputValue(value);
        }}
      />
      <div className="relative">
        <div
          className={cn(
            "absolute top-full z-50 mt-3 w-full rounded-lg bg-secondary animate-in fade-in-0 zoom-in-95",
            open ? "block" : "hidden",
          )}
        >
          <CommandList>
            <GlobalSearchCommands
              inputDebouncedValue={inputDebouncedValue}
              inputValue={inputValue}
              onClose={() => {
                inputRef.current?.blur();
              }}
            />
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
}
