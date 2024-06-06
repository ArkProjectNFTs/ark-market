import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import LargeGridIcon from "@ark-market/ui/components/icons/large-grid-icon";
import ListIcon from "@ark-market/ui/components/icons/list-icon";
import SmallGridIcon from "@ark-market/ui/components/icons/small-grid-icon";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ark-market/ui/components/toggle-group";

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
        onValueChange={setViewType}
        className={className}
      >
        <ToggleGroupItem value="large-grid" aria-label="Toggle large grid view">
          <LargeGridIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="small-grid" aria-label="Toggle small grid view">
          <SmallGridIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="Toggle list view">
          <ListIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
