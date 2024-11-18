"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ark-market/ui/dropdown-menu";
import { Share2, Telegram, XIcon } from "@ark-market/ui/icons";

import ExternalLink from "~/components/external-link";

export default function TokenSummaryShareDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus-visible:none flex size-6 text-[1.5rem]">
          <Share2
            className="size-6 text-muted-foreground transition-colors hover:text-foreground"
            weight={45}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <ExternalLink
            // href={`https://x.com/intent/post?text=${window.location.href}`}
            className="h-full w-full"
          >
            <div className="flex items-center gap-2">
              <XIcon className="size-4" />
              <p> Share on X</p>
            </div>
          </ExternalLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink
            // href={`https://t.me/share/url?url=${window.location.href}`}
            className="h-full w-full"
          >
            <div className="flex items-center gap-2">
              <Telegram className="size-4" />
              <p>Share on Telegram</p>
            </div>
          </ExternalLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
