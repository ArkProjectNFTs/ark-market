"use client";

import { useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  formatNumber,
} from "@ark-market/ui";
import { Dialog, DialogContent, DialogTrigger } from "@ark-market/ui/dialog";
import { Ethereum, Meh, Search, VerifiedIcon } from "@ark-market/ui/icons";
import { SearchInput } from "@ark-market/ui/search-input";

import getCollectionSearch from "~/lib/getCollectionSearch";
import Media from "./media";
import MobileGlobalSearchSuggestions from "./mobile-global-search-suggestions";
import ProfilePicture from "./profile-picture";

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

  if (
    searchResults.data.collections.length === 0 &&
    searchResults.data.accounts.length === 0
  ) {
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
      {searchResults.data.collections.length > 0 && (
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Collections
          </p>
          <div className="my-4 flex flex-col gap-2.5">
            {searchResults.data.collections.map((searchResult) => {
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
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1">
                      <p
                        className={cn("text-sm font-medium", ellipsableStyles)}
                      >
                        {searchResult.name}
                      </p>
                      {searchResult.is_verified && (
                        <VerifiedIcon className="size-3 flex-shrink-0 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <Ethereum className="-ml-1 size-4" />
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
      )}
      {searchResults.data.accounts.length > 0 && (
        <div>
          <p className="text-sm font-medium text-muted-foreground">Accounts</p>
          <div className="mt-4 flex flex-col gap-2.5">
            {searchResults.data.accounts.map((searchResult) => {
              return (
                <Link
                  onClick={onClose}
                  key={`${searchResult.owner}`}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xs bg-transparent p-2 transition-colors",
                    focusableStyles,
                  )}
                  href={`/wallet/${searchResult.owner}`}
                >
                  {searchResult.image ? (
                    <Media
                      alt=""
                      src={searchResult.image}
                      height={64}
                      width={64}
                      className="size-8 rounded-xs"
                    />
                  ) : (
                    <ProfilePicture
                      address={searchResult.owner}
                      className="size-8 rounded-xs"
                    />
                  )}
                  <div className="overflow-hidden">
                    <p className={cn("text-sm font-medium", ellipsableStyles)}>
                      {searchResult.owner}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
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
        <div className="mt-10 h-full pt-5">
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
