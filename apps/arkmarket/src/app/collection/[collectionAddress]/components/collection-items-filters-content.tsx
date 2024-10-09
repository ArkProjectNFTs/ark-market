import { Label } from "@ark-market/ui/label";
import { RadioGroup, RadioGroupItem } from "@ark-market/ui/radio-group";

interface CollectionItemsFiltersContentProps {
  buyNow: boolean;
  setBuyNow: (buyNow: boolean) => void;
}

export default function CollectionItemsFiltersContent({
  buyNow,
  setBuyNow,
}: CollectionItemsFiltersContentProps) {
  function onValueChange(value: string) {
    if (value === "buy-now") {
      setBuyNow(true);
      return;
    }
    setBuyNow(false);
  }
  return (
    <div>
      <p className="px-5 py-4 text-base font-bold">Status</p>

      <RadioGroup
        className="whitespace-nowrap px-5 pb-6"
        value={buyNow ? "buy-now" : "show-all"}
        onValueChange={onValueChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="show-all" id="show-all" />
          <Label htmlFor="show-all">Show all</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="buy-now" id="buy-now" />
          <Label htmlFor="buy-now">Buy now</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
