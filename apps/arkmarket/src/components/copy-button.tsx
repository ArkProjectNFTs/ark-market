"use client";

import { Copy } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, focusableStyles } from "@ark-market/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ark-market/ui/tooltip";

import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({
  className,
  textToCopy,
}: PropsWithClassName<CopyButtonProps>) {
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <TooltipProvider>
      <Tooltip open={copiedText !== null}>
        <TooltipTrigger asChild>
          <button
            onClick={() => copy(textToCopy)}
            className={cn("h-4", focusableStyles, className)}
          >
            <Copy className="h-full w-auto text-muted-foreground hover:text-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Copied</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
