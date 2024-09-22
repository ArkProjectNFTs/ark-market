import { Label } from "@ark-market/ui/label";
import { RadioGroup, RadioGroupItem } from "@ark-market/ui/radio-group";

import type { PortfolioOffersTypeValues } from "~/lib/getPortfolioOffers";

interface PortfolioOffersMobileFiltersProps {
  value: PortfolioOffersTypeValues;
  onValueChange: (value: PortfolioOffersTypeValues) => void;
}

export default function PortfolioOffersMobileFilters({
  onValueChange,
  value,
}: PortfolioOffersMobileFiltersProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="flex items-center gap-6"
      orientation="horizontal"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="made" id="made" />
        <Label htmlFor="made">Made</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="received" id="received" />
        <Label htmlFor="received">Received</Label>
      </div>
    </RadioGroup>
  );
}
