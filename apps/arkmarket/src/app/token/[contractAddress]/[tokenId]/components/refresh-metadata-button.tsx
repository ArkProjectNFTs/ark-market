"use client";

import { useMutation } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

import { useToast } from "@ark-market/ui/use-toast";

export default function RefreshMetadataButton() {
  const { toast } = useToast();

  // TODO: useMutation

  return (
    <button
      onClick={() => {
        toast({
          title: "Metadata is refreshing",
          description:
            "We've queued this item for an update! Check back in a minute...",
        });
      }}
    >
      <RefreshCw className="size-6 text-muted-foreground" />
    </button>
  );
}
