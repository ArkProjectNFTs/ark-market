import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Meh } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";

import { cn, focusableStyles } from "@ark-market/ui";
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ark-market/ui/popover";
import { SearchInput } from "@ark-market/ui/search-input";

import getCollectionSearch from "~/lib/getCollectionSearch";
import Media from "./media";

interface GlobalSearchProps {
  inputValue: string;
  inputDebouncedValue: string;
}

function GlobalSearch({ inputValue, inputDebouncedValue }: GlobalSearchProps) {
  const { data: searchResults } = useQuery({
    queryKey: ["searchCollection", inputDebouncedValue],
    refetchInterval: false,
    queryFn: () => getCollectionSearch({ searchQuery: inputDebouncedValue }),
    enabled: inputDebouncedValue.length > 0,
  });

  if (inputValue.length === 0) {
    return <p className="pl-3 font-medium">Enter something</p>;
  }

  if (searchResults === undefined) {
    return <p className="pl-3 font-medium">Loading...</p>;
  }

  if (searchResults.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3">
        <Meh className="size-10" />
        <p className="pl-3 text-xl font-semibold">
          Sorry, there are no results for your search.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="pl-3 font-medium text-muted-foreground">Collections</p>
      <div className="gap- mt-4">
        {searchResults.data.map((searchResult) => {
          return (
            <Link
              className={cn(
                "flex items-center gap-2 rounded-xs bg-transparent p-2 transition-colors hover:bg-accent",
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
                <p className="text-sm font-medium">{searchResult.name}</p>
                <div className="flex items-center">
                  <EthereumLogo2 className="size-4" />
                  <p className="text-xs font-medium text-muted-foreground">
                    {searchResult.token_count} items
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

export default function GlobalSearchContainer() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputDebouncedValue, setInputDebouncedValue] = useDebounceValue(
    "",
    500,
  );

  const openSearch = () => setOpen(true);
  const closeSearch = () => setOpen(false);

  return (
    <Popover open={open}>
      <PopoverTrigger>
        <SearchInput
          placeholder="Search Nft, collections and account"
          className="w-[30rem]"
          onFocus={openSearch}
          onBlur={closeSearch}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            setInputDebouncedValue(event.target.value);
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="center"
        className="mt-3 max-h-96 w-[30rem] overflow-auto bg-secondary px-1.5"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <GlobalSearch
          inputDebouncedValue={inputDebouncedValue}
          inputValue={inputValue}
        />
      </PopoverContent>
    </Popover>
  );
}
