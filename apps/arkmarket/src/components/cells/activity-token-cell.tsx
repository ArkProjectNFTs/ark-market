import { TableCell } from "@ark-market/ui/table";
import Link from "next/link";
import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import Media from "~/components/media";
import { VerifiedIcon } from "@ark-market/ui/icons";
import type { TokenMetadata } from "~/types";

interface TokenCellProps {
  metadata: TokenMetadata | null;
  collectionAddress: string;
  token_id: string | number;
  name: string;
  address: string;
  is_verified: boolean;
}

export default function TokenCell({ metadata, collectionAddress, token_id, name, address, is_verified }: TokenCellProps) {
  return (
    <TableCell>
      <div className="flex items-center gap-4">
        <Media
          alt={metadata?.name ?? ""}
          className="size-[3.75rem] rounded-xs object-contain"
          height={120}
          width={120}
          src={metadata?.image ?? undefined}
          mediaKey={metadata?.image_key ?? undefined}
        />
        <div className="w-full overflow-hidden">
          <Link className={focusableStyles} href={`/token/${collectionAddress}/${token_id}`}>
            <p className={cn("w-full text-base font-medium", ellipsableStyles)}>
              {metadata?.name ?? `${name} #${token_id}`}
            </p>
          </Link>
          <div className="flex w-full items-center gap-1">
            <Link className={cn(focusableStyles, ellipsableStyles)} href={`/collection/${address}`}>
              <p className={cn("text-muted-foreground transition-colors hover:text-primary", ellipsableStyles)}>
                {name}
              </p>
            </Link>
            {is_verified && <VerifiedIcon className="size-4 text-primary" />}
          </div>
        </div>
      </div>
    </TableCell>
  );
}
