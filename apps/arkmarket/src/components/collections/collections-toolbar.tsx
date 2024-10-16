import { SearchInput } from "@ark-market/ui/search-input";

import type { CollectionTimerange } from "~/types";
import CollectionsTimeranges from "./collections-timeranges";

interface CollectionsToolbarProps {
  timerange: CollectionTimerange;
  onTimerangeChange: (timerange: CollectionTimerange) => void;
  onSearchChange: (query: string) => void;
}

export default function CollectionsToolbar({
  timerange,
  onTimerangeChange,
  onSearchChange,
}: CollectionsToolbarProps) {
  return (
    <div className="flex gap-4 px-6 py-6">
      <SearchInput
        placeholder="Search collection"
        onChange={(e) => onSearchChange(e.currentTarget.value)}
      />
      <CollectionsTimeranges
        timerange={timerange}
        onChange={onTimerangeChange}
      />
    </div>
  );
}
