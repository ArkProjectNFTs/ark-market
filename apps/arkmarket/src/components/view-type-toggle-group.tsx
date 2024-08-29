import type { PropsWithClassName } from "@ark-market/ui";
import LargeGridIcon from "@ark-market/ui/icons/large-grid-icon";
import ListIcon from "@ark-market/ui/icons/list-icon";
import SmallGridIcon from "@ark-market/ui/icons/small-grid-icon";
import { ToggleGroup, ToggleGroupItem } from "@ark-market/ui/toggle-group";

export const viewTypes = ["large-grid", "small-grid", "list"] as const;
export type ViewType = (typeof viewTypes)[number];

interface ViewTypeToggleGroupProps {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

export default function ViewTypeToggleGroup({
  className,
  viewType,
  setViewType,
}: PropsWithClassName<ViewTypeToggleGroupProps>) {
  return (
    <>
      <ToggleGroup
        type="single"
        value={viewType}
        onValueChange={(value) =>
          value !== "" && setViewType(value as ViewType)
        }
        className={className}
      >
        <ToggleGroupItem className="px-2.5 text-lg" value="large-grid" aria-label="Toggle large grid view">
          <LargeGridIcon />
        </ToggleGroupItem>
        <ToggleGroupItem className="px-2.5 text-lg" value="small-grid" aria-label="Toggle small grid view">
          <SmallGridIcon />
        </ToggleGroupItem>
        <ToggleGroupItem className="px-2.5 text-lg" value="list" aria-label="Toggle list view">
          <ListIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
