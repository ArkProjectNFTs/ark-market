"use client";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Label } from "@ark-market/ui/label";
import { RadioGroup, RadioGroupItem } from "@ark-market/ui/radio-group";

import type { PortfolioOffersTypeValues } from "~/lib/getPortfolioOffers";

interface PortfolioOffersFiltersPanelProps {
  value: PortfolioOffersTypeValues;
  onValueChange: (value: PortfolioOffersTypeValues) => void;
}

export default function PortfolioOffersFiltersPanel({
  className,
  value,
  onValueChange,
}: PropsWithClassName<PortfolioOffersFiltersPanelProps>) {
  return (
    <div
      className={cn(
        "w-72 flex-shrink-0 overflow-y-auto border-r border-border",
        className,
      )}
    >
      <p className="px-5 pt-6 font-bold">Type</p>

      <RadioGroup
        value={value}
        className="mt-6 whitespace-nowrap px-5 pb-6"
        onValueChange={onValueChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="made" id="made" />
          <Label htmlFor="made">Made</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="received" id="received" />
          <Label htmlFor="received">Received</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
