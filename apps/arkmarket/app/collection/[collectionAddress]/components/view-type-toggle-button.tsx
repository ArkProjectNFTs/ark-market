import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import LargeGridIcon from "@ark-market/ui/components/icons/large-grid-icon";
import ListIcon from "@ark-market/ui/components/icons/list-icon";
import SmallGridIcon from "@ark-market/ui/components/icons/small-grid-icon";

import type { ViewType } from "./view-type-toggle-group";
import { viewTypes } from "./view-type-toggle-group";

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
    const currentIndex = viewTypes.indexOf(viewType);
    const nextIndex = (currentIndex + 1) % viewTypes.length;
    setViewType(viewTypes[nextIndex]!);
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className={className}
      onClick={onButtonClick}
    >
      {viewType === "large-grid" ? (
        <LargeGridIcon />
      ) : viewType === "small-grid" ? (
        <SmallGridIcon />
      ) : (
        <ListIcon />
      )}
    </Button>
  );
}
