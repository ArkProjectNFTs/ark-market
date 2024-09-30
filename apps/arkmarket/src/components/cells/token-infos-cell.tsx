import Link from "next/link";
import { cn, ellipsableStyles } from "@ark-market/ui";
import Media from "~/components/media";
import type { CollectionToken } from "~/types";
import { TableCell } from "@ark-market/ui/table";

interface TokenNameCellProps {
  token: CollectionToken;
}

export default function TokenInfosCell({ token }: TokenNameCellProps) {
  return (
    <TableCell className="sticky left-0 min-w-[240px] flex-grow pl-5 backdrop-blur-3xl transition-colors">
      <Link
        prefetch={false}
        href={`/token/${token.collection_address}/${token.token_id}`}
        className="flex items-center gap-4"
      >
        <Media
          src={token.metadata?.image}
          mediaKey={token.metadata?.image_key}
          alt={token.metadata?.name ?? "Empty NFT"}
          className="size-10 rounded-md object-contain"
        />
        <div className={cn("w-full", ellipsableStyles)}>
          {token.metadata?.name ?? token.token_id}
        </div>
      </Link>
    </TableCell>
  );
}
