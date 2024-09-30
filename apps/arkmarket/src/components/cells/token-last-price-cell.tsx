import { Ethereum } from "@ark-market/ui/icons";
import { formatUnits } from "@ark-market/ui";
import { TableCell } from "@ark-market/ui/table";

interface TokenLastSoldCellProps {
  price: number | string | undefined
}

export default function TokenLastSoldCell({ price }: TokenLastSoldCellProps) {
  return (
    <TableCell className="flex w-[20%]">
      {price ? (
        <div className="flex items-center">
          <Ethereum className="size-4" />
          <p>
            {formatUnits(price, 18)}{" "}
            <span className="text-muted-foreground">ETH</span>
          </p>
        </div>
      ) : (
        "_"
      )}
    </TableCell>
  );
}
