import { useQueryState } from "nuqs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";

import {
  tokenActivityFilterKey,
  TokenActivityFiltersParser,
} from "~/lib/getTokenActivity";
import { tokenActivityTypes } from "~/types";
import { activityTypeToItem } from "./desktop-token-activity";

export default function TokenActivityFilterSelect() {
  const [tokenActivityFilter, setTokenActivityFilter] = useQueryState(
    tokenActivityFilterKey,
    TokenActivityFiltersParser,
  );
  return (
    <Select
      value={tokenActivityFilter ?? undefined}
      onValueChange={setTokenActivityFilter}
    >
      <SelectTrigger className="w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {tokenActivityTypes.map((tokenActivityType, index) => {
            return (
              <SelectItem key={index} value={tokenActivityType}>
                {activityTypeToItem.get(tokenActivityType)?.title}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
