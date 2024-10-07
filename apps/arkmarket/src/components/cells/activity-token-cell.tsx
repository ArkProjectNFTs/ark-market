import Link from "next/link";

import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import { VerifiedIcon } from "@ark-market/ui/icons";
import { TableCell } from "@ark-market/ui/table";

import type { TokenMetadata } from "~/types";
import Media from "~/components/media";

interface TokenCellProps {
  metadata: TokenMetadata | null;
  collectionAddress: string;
  tokenId: string | number;
  name: string;
  address: string;
  isVerified: boolean;
}

export default function TokenCell({
  metadata,
  collectionAddress,
  tokenId,
  name,
  address,
  isVerified,
}: TokenCellProps) {
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
          <Link
            className={focusableStyles}
            href={`/token/${collectionAddress}/${tokenId}`}
          >
            <p className={cn("w-full text-base font-medium", ellipsableStyles)}>
              {metadata?.name ?? `${name} #${tokenId}`}
            </p>
          </Link>
          <div className="flex w-full items-center gap-1">
            <Link
              className={cn(focusableStyles, ellipsableStyles)}
              href={`/collection/${address}`}
            >
              <p
                className={cn(
                  "text-muted-foreground transition-colors hover:text-primary",
                  ellipsableStyles,
                )}
              >
                {name}
              </p>
            </Link>
            {isVerified && <VerifiedIcon className="size-4 text-primary" />}
          </div>
        </div>
      </div>
    </TableCell>
  );
}
