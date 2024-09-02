"use client";

import { Button } from "@ark-market/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ark-market/ui/dropdown-menu";
import {
  Copy,
  MoreHorizontal,
  RefreshCw,
  Telegram,
  XIcon,
} from "@ark-market/ui/icons";

import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";

interface TokenSummaryMobileActionsProps {
  textToCopy: string;
}

export default function TokenSummaryMobileActions({
  textToCopy,
}: TokenSummaryMobileActionsProps) {
  const [_, copy] = useCopyToClipboard();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copy(textToCopy)}>
          <div className="flex items-center gap-2">
            <Copy className="size-4" />
            <p>Copy Link</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <XIcon className="size-4" />
            <p> Share on X</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <Telegram className="size-4" />
            <p>Share on Telegram</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <RefreshCw className="size-4" />
            <p>Refresh metadata</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
