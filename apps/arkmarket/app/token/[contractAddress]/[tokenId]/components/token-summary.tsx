import { RefreshCw, Share2 } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import VerifiedIcon from "@ark-market/ui/components/icons/verified-icon";
import { cn, ellipsableStyles } from "@ark-market/ui/lib/utils";

import CopyButton from "~/components/copy-button";
import Media from "~/components/media";

interface TokenSummaryProps {
  contractAddress: string;
}

export default function TokenSummary({
  className,
  contractAddress,
}: PropsWithClassName<TokenSummaryProps>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-3 font-semibold lg:flex-col lg:gap-8",
        className,
      )}
    >
      <Media
        alt="Everai"
        src="https://media.arkproject.dev/ab43f917530bbfd33cb3d9d7ef92180d515c3b1bce8674b45a9ace6283ba5d43.mp4"
        className="w-full rounded-xs"
      />
      <div className="flex flex-col lg:gap-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg text-muted-foreground">Everai</h3>
          <VerifiedIcon className="size-6 text-background" />
        </div>
        <div className="flex items-center justify-between">
          <p
            className={cn("w-full overflow-hidden text-3xl", ellipsableStyles)}
          >
            Everai #2345
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
