import { ToggleGroup, ToggleGroupItem } from "@ark-market/ui/toggle-group";

import type { CollectionTimerange } from "~/types";

const TIMERANGES = ["10m", "1h", "6h", "1d", "7d", "30d"];

interface CollectionsTimerangesProps {
  timerange: CollectionTimerange;
  onChange: (timerange: CollectionTimerange) => void;
}

export default function CollectionsTimeranges({
  timerange,
  onChange,
}: CollectionsTimerangesProps) {
  return (
    <ToggleGroup type="single" value={timerange} onValueChange={onChange}>
      {TIMERANGES.map((t) => (
        <ToggleGroupItem
          value={t}
          aria-label={t}
          className="w-10 uppercase"
          onClick={(e) => {
            if (t === timerange) {
              e.preventDefault();
            }
          }}
        >
          {t}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
