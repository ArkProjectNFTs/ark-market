import { formatNumber } from "@ark-market/ui";
import { TabsListV2, TabsTriggerV2, TabsV2 } from "@ark-market/ui/tabs-v2";

export const portfolioTabsValues = ["items", "activity", "orders"] as const;

export type PortfolioTabsValues = (typeof portfolioTabsValues)[number];

interface PortfolioTabsProps {
  value: PortfolioTabsValues;
  onValueChange: (value: PortfolioTabsValues) => void;
  portfolioItemsCount: number;
  isOwner: boolean;
}

export default function PortfolioTabs({
  value,
  onValueChange,
  portfolioItemsCount,
  isOwner,
}: PortfolioTabsProps) {
  return (
    <TabsV2
      value={value}
      onValueChange={(val) => onValueChange(val as PortfolioTabsValues)}
    >
      <TabsListV2 className="flex gap-8 border-b border-border sm:border-none">
        <TabsTriggerV2 value="items" className="flex items-center gap-2">
          {isOwner ? "My Items " : "Items "}
          <p className="flex h-5 items-center rounded-full bg-secondary px-1.5 text-xs font-medium text-secondary-foreground">
            {formatNumber(portfolioItemsCount)}
          </p>
        </TabsTriggerV2>
        <TabsTriggerV2 value="orders">Orders</TabsTriggerV2>
        <TabsTriggerV2 value="activity">Activity</TabsTriggerV2>
      </TabsListV2>
    </TabsV2>
  );
}
