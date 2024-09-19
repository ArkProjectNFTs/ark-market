"use client";

import { useMutation } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

import { useToast } from "@ark-market/ui/use-toast";

import refreshTokenMetadata from "~/queries/refreshTokenMetadata";

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
      await refreshTokenMetadata({
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
    >
      <RefreshCw className="size-6 text-muted-foreground" />
    </button>
  );
}
