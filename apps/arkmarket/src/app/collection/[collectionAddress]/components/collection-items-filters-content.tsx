import { Label } from "@ark-market/ui/label";
import { RadioGroup, RadioGroupItem } from "@ark-market/ui/radio-group";

export default function CollectionItemsFiltersContent() {
  return (
    <div>
      <p className="px-5 pt-6 font-bold">Status</p>

      <RadioGroup
        defaultValue="show-all"
        className="mt-6 whitespace-nowrap px-5 pb-6"
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
