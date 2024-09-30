"use client";

import { useMutation } from "@tanstack/react-query";

import { RefreshCw } from "@ark-market/ui/icons";
import { useToast } from "@ark-market/ui/use-toast";

import postTokenMetadataRefresh from "~/lib/postTokenMetadataRefresh";

interface RefreshMetadataButtonProps {
  contractAddress: string;
  tokenId: string;
}

export default function RefreshMetadataButton({
  contractAddress,
  tokenId,
}: RefreshMetadataButtonProps) {
  const { toast } = useToast();

  const refreshMetadataMutation = useMutation({
    mutationFn: async () => {
      await postTokenMetadataRefresh({
        contractAddress,
        tokenId,
      });
    },
    onSuccess: () => {
      toast({
        title: "Metadata is refreshing",
        description:
          "We've queued this item for an update! Check back in a minute...",
      });
    },
    onError: () => {
      toast({
        title: "Failed to refresh metadata",
        description: "Please try again later.",
      });
    },
  });

  return (
    <button
      onClick={async () => {
        await refreshMetadataMutation.mutateAsync();
      }}
      className="flex text-[1.5rem]"
    >
      <RefreshCw className="size-6 text-muted-foreground transition-colors hover:text-foreground" />
    </button>
  );
}
