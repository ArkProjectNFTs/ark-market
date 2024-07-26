"use client";

import { useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Meh, Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";

import { cn, focusableStyles, formatNumber } from "@ark-market/ui";
import { Dialog, DialogContent, DialogTrigger } from "@ark-market/ui/dialog";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";
import { SearchInput } from "@ark-market/ui/search-input";

import getCollectionSearch from "~/lib/getCollectionSearch";
import Media from "./media";
import MobileGlobalSearchSuggestions from "./mobile-global-search-suggestions";

interface MobileGlobalSearchProps {
  inputValue: string;
  inputDebouncedValue: string;
  onClose: () => void;
}

function MobileGlobalSearch({
  inputValue,
  inputDebouncedValue,
  onClose,
}: MobileGlobalSearchProps) {
  const { data: searchResults } = useQuery({
    queryKey: ["searchCollection", inputDebouncedValue],
    refetchInterval: false,
    placeholderData: keepPreviousData,
    queryFn: () => getCollectionSearch({ searchQuery: inputDebouncedValue }),
    enabled: inputDebouncedValue.length >= 3,
  });

  if (
    searchResults === undefined ||
    inputValue.length < 3 ||
    inputDebouncedValue.length < 3
  ) {
    return (
      <div>
        <MobileGlobalSearchSuggestions onClose={onClose} />
      </div>
    );
  }

  if (searchResults.data.length === 0) {
    return (
      <div className="pt-4">
        <div className="mb-8 flex flex-col items-center gap-3 text-muted-foreground">
          <Meh className="size-10" />
          <p className="pl-3 text-center text-xl font-semibold">
            Sorry, there are no results for your search.
          </p>
        </div>

        <MobileGlobalSearchSuggestions onClose={onClose} />
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">Collections</p>
      <div className="mt-4 flex flex-col gap-2.5">
        {searchResults.data.map((searchResult) => {
          return (
            <Link
              onClick={onClose}
              key={`${searchResult.address}-${searchResult.name}`}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xs bg-transparent p-2 transition-colors",
                focusableStyles,
              )}
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
          );
        })}
      </div>
    </div>
  );
}

export default function MobileGlobalSearchWrapper() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputDebouncedValue, setInputDebouncedValue] = useDebounceValue(
    "",
    500,
  );

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Search className="size-6" />
      </DialogTrigger>
      <DialogContent className="bg-secondary">
        <div className="absolute left-0 right-0 top-0 z-50 flex h-[var(--site-header-height)] w-full items-center gap-2.5 bg-background px-2.5">
          <SearchInput
            value={inputValue}
            placeholder="Search Nft, collections and account..."
            className="h-10"
            onChange={(event) => {
              setInputDebouncedValue(event.target.value);
              setInputValue(event.target.value);
            }}
          />
          <button
            className="text-sm font-medium text-muted-foreground"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        <div className="mt-10 h-full pt-5 ">
          <MobileGlobalSearch
            inputDebouncedValue={inputDebouncedValue}
            inputValue={inputValue}
            onClose={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
