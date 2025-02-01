import { Button } from "@ark-market/ui/button";
import { ArrowUpRight } from "@ark-market/ui/icons";
import { TableCell } from "@ark-market/ui/table";

import { env } from "~/env";
import ExternalLink from "../external-link";

interface ActivityTransactionProps {
  transactionHash?: string | null;
}

export default function ActivityTransaction({
  transactionHash,
}: ActivityTransactionProps) {
  return (
    <TableCell className="pr-5 text-end">
      {transactionHash ? (
        <Button asChild size="icon" variant="outline">
          <ExternalLink
            href={`https://${env.NEXT_PUBLIC_NETWORK === "sepolia" ? "sepolia." : ""}starkscan.co/tx/${transactionHash}`}
          >
            <ArrowUpRight className="size-5" />
          </ExternalLink>
        </Button>
      ) : null}
    </TableCell>
  );
}
