import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/components/select";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";

interface CollectionItemsSortingSelectProps {
  setSortBy: (sortBy: CollectionSortBy) => void;
  setSortDirection: (sortDirection: CollectionSortDirection) => void;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
}

export default function CollectionItemsSortingSelect({
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
}: CollectionItemsSortingSelectProps) {
  const sortValue = `${sortBy}-${sortDirection}`;

  function onValueChange(value: string) {
    // We need to do this because we have to represent two states in one
    const values = value.split("-") as [
      CollectionSortBy,
      CollectionSortDirection,
    ];
    if (values.length !== 2) {
      throw new Error("Wrong select value");
    }

    setSortBy(values[0]);
    setSortDirection(values[1]);
  }

  return (
    <Select value={sortValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="price-asc">Price: Low to high</SelectItem>
          <SelectItem value="price-desc" onChange={() => console.log("CHANGE")}>
            Price: High to low
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
