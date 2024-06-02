import LargeGridIcon from "@ark-market/ui/components/icons/large-grid-icon";
import ListIcon from "@ark-market/ui/components/icons/list-icon";
import SmallGridIcon from "@ark-market/ui/components/icons/small-grid-icon";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ark-market/ui/components/toggle-group";

export type ViewType = "large-grid" | "small-grid" | "list";

interface ViewTypeToggleGroupProps {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

export default function ViewTypeToggleGroup({
  viewType,
  setViewType,
}: ViewTypeToggleGroupProps) {
  return (
    <ToggleGroup type="single" value={viewType} onValueChange={setViewType}>
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
  );
}
