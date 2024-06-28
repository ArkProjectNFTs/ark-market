import Link from "next/link";
import { RefreshCw, Share2 } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles } from "@ark-market/ui";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import type { TokenInfosApiResponse } from "../queries/getTokenData";
import CopyButton from "~/components/copy-button";
import Media from "~/components/media";

interface TokenSummaryProps {
  contractAddress: string;
  tokenInfos: TokenInfosApiResponse["data"];
  tokenId: string;
}

export default function TokenSummary({
  className,
  contractAddress,
  tokenInfos,
  tokenId,
}: PropsWithClassName<TokenSummaryProps>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 font-semibold lg:flex-col lg:gap-8",
        className,
      )}
    >
      <Media
        src={tokenInfos.metadata?.animation_url ?? tokenInfos.metadata?.image}
        mediaKey={
          tokenInfos.metadata?.animation_key ?? tokenInfos.metadata?.image_key
        }
        alt={
          tokenInfos.metadata?.name ??
          `${tokenInfos.collection_name} #${tokenId}`
        }
        className="w-full rounded-lg"
        height={1000}
        width={1000}
      />
      <div className="flex flex-col lg:gap-4">
        <div className="flex items-center gap-1.5">
          <Link href={`/collection/${contractAddress}`}>
            <h3 className="text-lg text-muted-foreground">
              {tokenInfos.collection_name}
            </h3>
          </Link>
          <VerifiedIcon className="size-6 text-background" />
        </div>
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "w-full overflow-hidden text-2xl lg:text-3xl",
              ellipsableStyles,
            )}
          >
            {tokenInfos.metadata?.name}
          </p>
          <div className="flex items-center gap-6">
            <Share2 className="size-6 text-muted-foreground" />
            <CopyButton
              className="size-6 text-muted-foreground"
              textToCopy={contractAddress}
            />
            <RefreshCw className="size-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
