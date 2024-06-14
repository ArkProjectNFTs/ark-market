import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import LargeGridIcon from "@ark-market/ui/components/icons/large-grid-icon";
import ListIcon from "@ark-market/ui/components/icons/list-icon";

import type { ViewType } from "./view-type-toggle-group";

interface ViewTypeToggleButtonProps {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

export default function ViewTypeToggleButton({
  className,
  viewType,
  setViewType,
}: PropsWithClassName<ViewTypeToggleButtonProps>) {
  const onButtonClick = () => {
    if (viewType === "large-grid" || viewType === "small-grid") {
      setViewType("list");
      return;
    }
    setViewType("small-grid");
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className={className}
      onClick={onButtonClick}
    >
      {viewType === "large-grid" || viewType === "small-grid" ? (
        <LargeGridIcon />
      ) : (
        <ListIcon />
      )}
    </Button>
  );
}
