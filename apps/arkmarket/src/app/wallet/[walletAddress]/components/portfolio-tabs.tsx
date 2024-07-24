import { formatNumber } from "@ark-market/ui";
import { TabsListV2, TabsTriggerV2, TabsV2 } from "@ark-market/ui/tabs-v2";

export type PortfolioTabsValues = "items" | "activity" | "offers";

interface PortfolioTabsProps {
  value: PortfolioTabsValues;
  onValueChange: (value: PortfolioTabsValues) => void;
  portfolioItemsCount: number;
}

export default function PortfolioTabs({
  value,
  onValueChange,
  portfolioItemsCount,
}: PortfolioTabsProps) {
  return (
    <TabsV2
      value={value}
      onValueChange={(val) => onValueChange(val as PortfolioTabsValues)}
    >
      <TabsListV2 className="mb-4 flex gap-8 border-b border-border sm:mb-6 sm:border-none">
        <TabsTriggerV2 value="items" className="flex items-center gap-2">
          Items{" "}
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
