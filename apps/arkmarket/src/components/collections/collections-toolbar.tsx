import { Button } from "@ark-market/ui/button";
import { Filter } from "@ark-market/ui/icons";
import { SearchInput } from "@ark-market/ui/search-input";

import type { CollectionTimerange } from "~/types";
import CollectionsTimeranges from "./collections-timeranges";

interface CollectionsToolbarProps {
  timerange: CollectionTimerange;
  onTimerangeChange: (timerange: CollectionTimerange) => void;
}

export default function CollectionsToolbar({
  timerange,
  onTimerangeChange,
}: CollectionsToolbarProps) {
  return (
    <div className="flex gap-4 px-6 py-6">
      <Button className="" variant="outline" size="xl">
        <Filter className="size-3" />
        <span className="hidden lg:block">Filters</span>
      </Button>
      <SearchInput placeholder="Search collection" />
      <CollectionsTimeranges
        timerange={timerange}
        onChange={onTimerangeChange}
      />
    </div>
  );
}
