/* eslint-disable @next/next/no-img-element */
import { validateAndParseAddress } from "starknet";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { cn } from "@ark-market/ui/lib/utils";

export const collectionBannerRemHeight = 16.5;

interface CollectionBannerProps {
  collectionAddress: string;
}

export default function CollectionBanner({
  className,
  collectionAddress,
}: PropsWithClassName<CollectionBannerProps>) {
  if (
    validateAndParseAddress(collectionAddress) ===
    validateAndParseAddress(
      "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
    )
  ) {
    return (
      <img
        alt="Everai banner"
        src="/medias/everai_banner.png"
        style={{ height: collectionBannerRemHeight * 16, width: "100%" }}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn("bg-secondary", className)}
      style={{ height: `${collectionBannerRemHeight}rem` }}
    />
  );
}
