import type { HTMLAttributes, PropsWithChildren } from "react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { TabsListV2, TabsTriggerV2, TabsV2 } from "@ark-market/ui/tabs-v2";

export const collectionTabsValue = ["items", "activity"] as const;

export type PortfolioTabsValues = (typeof collectionTabsValue)[number];

interface CollectionItemsActivityHeaderProps {
  // TODO @YohanTz: Type properly
  activeTab: string;
  onTabChange: (newTab: PortfolioTabsValues) => void;
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
      <TabsV2
        value={activeTab}
        onValueChange={(value) => onTabChange(value as PortfolioTabsValues)}
      >
        <TabsListV2 className="flex gap-8 border-b border-border sm:border-none">
          <TabsTriggerV2 value="items">Items</TabsTriggerV2>
          <TabsTriggerV2 value="activity">Activity</TabsTriggerV2>
        </TabsListV2>
      </TabsV2>
      {children}
    </div>
  );
}
