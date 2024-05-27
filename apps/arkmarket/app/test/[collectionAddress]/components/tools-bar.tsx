import type { HTMLAttributes } from "react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import { cn } from "@ark-market/ui/lib/utils";

function LiveDataIndicator() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="48"
      viewBox="0 0 54 48"
      fill="none"
    >
      <g filter="url(#filter0_f_479_6095)">
        <circle cx="24" cy="24" r="10" fill="#63D056" />
      </g>
      <circle cx="23" cy="22" r="8" fill="#63D056" />
      <defs>
        <filter
          id="filter0_f_479_6095"
          x="-6"
          y="-6"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="10"
            result="effect1_foregroundBlur_479_6095"
          />
        </filter>
      </defs>
    </svg>
  );
}

interface ToolsBarProps {
  style?: HTMLAttributes<HTMLDivElement>["style"];
  toggleFiltersOpen: () => void;
}

export default function ToolsBar({
  className,
  style,
  toggleFiltersOpen,
}: PropsWithClassName<ToolsBarProps>) {
  return (
    <div className={cn("bg-background p-6", className)} style={style}>
      <div className="flex items-center gap-6">
        <Button onClick={toggleFiltersOpen}>Filters</Button>
        <div className="flex items-center font-medium">
          <LiveDataIndicator />
          <p>7777 results</p>
        </div>
        <div className="h-4 flex-1 bg-muted" />
      </div>
    </div>
  );
}
