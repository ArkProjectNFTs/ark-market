import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@ark-market/ui";

import type { InputProps } from "./input";
import { Input } from "./input";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", className)}>
        <Search
          size={24}
          className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground"
        />
        <Input ref={ref} type="search" className="pl-10" {...props} />
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
