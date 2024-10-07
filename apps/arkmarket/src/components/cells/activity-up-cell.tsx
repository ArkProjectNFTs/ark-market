import { Button } from "@ark-market/ui/button";
import { ArrowUpRight } from "@ark-market/ui/icons";
import { TableCell } from "@ark-market/ui/table";

import ExternalLink from "../external-link";

export default function ActivityUp() {
  return (
    <TableCell className="pr-5">
      <Button asChild size="icon" variant="outline">
        <ExternalLink href="/">
          <ArrowUpRight className="size-5" />
        </ExternalLink>
      </Button>
    </TableCell>
  );
}
