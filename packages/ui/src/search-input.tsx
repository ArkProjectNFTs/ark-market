import * as React from "react";
import { Search } from "@ark-market/ui/icons";

import { cn } from "@ark-market/ui";

import type { InputProps } from "./input";
import { Input } from "./input";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
        />
        <Input
          ref={ref}
          type="search"
          className={cn("pl-10", className)}
          {...props}
        />
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
