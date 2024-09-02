import type { PropsWithClassName } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Grid3X3, List } from "@ark-market/ui/icons";

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
      size="icon-xl"
      className={className}
      onClick={onButtonClick}
    >
      {viewType === "large-grid" || viewType === "small-grid" ? (
        <Grid3X3 />
      ) : (
        <List />
      )}
    </Button>
  );
}
