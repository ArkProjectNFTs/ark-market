import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/components/select";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "../../search-params";

interface PortfolioItemsSortingSelectProps {
  setSortBy: (sortBy: CollectionSortBy) => void;
  setSortDirection: (sortDirection: CollectionSortDirection) => void;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
}

export default function PortfolioItemsSortingSelect({
  className,
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
}: PropsWithClassName<PortfolioItemsSortingSelectProps>) {
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
    <div className={className}>
      <Select value={sortValue} onValueChange={onValueChange}>
        <SelectTrigger className="w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="price-asc">Price: Low to high</SelectItem>
            <SelectItem value="price-desc">Price: High to low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
