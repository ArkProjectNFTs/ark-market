import EtherIcon from "@ark-market/ui/components/icons/ether-icon";
import { Separator } from "@ark-market/ui/components/separator";

export default function CollectionHeaderStats() {
  return (
    <div className="flex h-12 items-center gap-6 pr-5">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Floor</p>
        <div className="flex items-center gap-1 font-medium">
          <EtherIcon />
          <p>1.6 ETH</p>
          <p className="text-sm font-semibold text-green-500">+0,02%</p>
        </div>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Total Volume
        </p>
        <p className="font-medium">8.3 ETH</p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">7D Volume</p>
        <p className="font-medium">15 ETH</p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
        <p className="font-medium">123</p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Items</p>
        <p className="font-medium">7777</p>
      </div>
      <Separator orientation="vertical" />

      <div>
        <p className="text-sm font-medium text-muted-foreground">Owners</p>
        <p className="font-medium">2 773</p>
      </div>
    </div>
  );
}
