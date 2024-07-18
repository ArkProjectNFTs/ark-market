"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Command as CommandPrimitive } from "cmdk";
import { Meh } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";

import { cn, focusableStyles, formatNumber } from "@ark-market/ui";
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
    enabled: inputDebouncedValue.length > 0,
  });
  const router = useRouter();

  if (inputValue.length === 0) {
    return (
      <div className="px-4 pb-4 pt-5">
        <GlobalSearchSuggestions onClose={onClose} />
      </div>
    );
  }

  if (searchResults === undefined || inputDebouncedValue.length === 0) {
    return (
      <div className="px-4 pb-4 pt-5">
        <GlobalSearchSuggestions onClose={onClose} />
      </div>
    );
  }

  if (searchResults.data.length === 0) {
    return (
      <div className=" px-4 pb-4 pt-5">
        <div className="mb-8 flex flex-col items-center gap-3 text-muted-foreground">
          <Meh className="size-10" />
          <p className="pl-3 text-xl font-semibold">
            Sorry, there are no results for your search.
          </p>
        </div>

        <GlobalSearchSuggestions onClose={onClose} />
      </div>
    );
  }

  return (
    <CommandGroup forceMount className="px-4 pb-4 pt-5">
      <p className="text-sm font-medium text-muted-foreground">Collections</p>
      <div className="mt-4 flex flex-col gap-2.5">
        {searchResults.data.map((searchResult) => {
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
                    <p className="text-sm font-medium">{searchResult.name}</p>
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
  // const closeSearch = () => setOpen(false);
  const closeSearch = () => null;

  return (
    <CommandPrimitive filter={() => 1}>
      <CommandInput
        placeholder="Type a command or search..."
        onFocus={openSearch}
        onBlur={closeSearch}
        ref={inputRef}
        className="w-[30rem]"
        onValueChange={(value) => {
          setInputValue(value);
          setInputDebouncedValue(value);
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
