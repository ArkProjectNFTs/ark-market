import type { HTMLAttributes, PropsWithChildren } from "react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@ark-market/ui/components/tabs";
import { cn } from "@ark-market/ui/lib/utils";

interface CollectionItemsActivityHeaderProps {
  // TODO @YohanTz: Type properly
  activeTab: string;
  onTabChange: (newTab: string) => void;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function CollectionItemsActivityHeader({
  activeTab,
  children,
  className,
  onTabChange,
  style,
}: PropsWithChildren<PropsWithClassName<CollectionItemsActivityHeaderProps>>) {
  return (
    <div
      className={cn("border-b border-border lg:border-none", className)}
      style={style}
    >
      <Tabs value={activeTab} className="w-36" onValueChange={onTabChange}>
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </div>
  );
}
