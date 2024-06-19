import type { HTMLAttributes, PropsWithChildren } from "react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import {
  TabsListV2,
  TabsTriggerV2,
  TabsV2,
} from "@ark-market/ui/components/tabs-v2";
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
      className={cn(
        "border-b border-border px-5 pb-4 sm:py-6 sm:pt-4 lg:border-none",
        className,
      )}
      style={style}
    >
      <TabsV2 value={activeTab} onValueChange={onTabChange}>
        <TabsListV2 className="mb-4 flex gap-8 border-b border-border sm:mb-6 sm:border-none">
          <TabsTriggerV2 value="items">Items</TabsTriggerV2>
          <TabsTriggerV2 value="activity">Activity</TabsTriggerV2>
        </TabsListV2>
      </TabsV2>
      {children}
    </div>
  );
}
