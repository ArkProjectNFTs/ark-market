"use client";

import React, { useState } from "react";
import Image from "next/image";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Skeleton } from "@ark-market/ui/skeleton";

import { env } from "~/env";

interface MediaProps {
  // key used to access the image proxy / CDN
  mediaKey?: string | null;
  alt: string;
  src?: string | null;
  width?: number;
  height?: number;
}

function getMediaSrc(
  src?: string | null,
  media_key?: string | null,
  width?: number,
  height?: number,
) {
  if (media_key && width && height) {
    const resolutionParam = `:${width}:${height}`;
    return `${env.NEXT_PUBLIC_IMAGE_PROXY_URL}/_/rs:fit${resolutionParam}/plain/${env.NEXT_PUBLIC_IMAGE_CDN_URL}/${media_key}`;
  }
  return src?.replace("ipfs://", env.NEXT_PUBLIC_IPFS_GATEWAY);
}

function MediaPlaceholder({ className }: PropsWithClassName) {
  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center justify-center bg-secondary",
        className,
      )}
    >
      <svg
        width="79"
        height="79"
        viewBox="0 0 79 79"
        fill="none"
        className="text-background"
      >
        <path
          d="M62.3462 10.2844H16.7915C13.1973 10.2844 10.2837 13.1981 10.2837 16.7922V62.3469C10.2837 65.9411 13.1973 68.8547 16.7915 68.8547H62.3462C65.9403 68.8547 68.854 65.9411 68.854 62.3469V16.7922C68.854 13.1981 65.9403 10.2844 62.3462 10.2844Z"
          stroke="currentColor"
          strokeWidth="3.90469"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.8076 36.3159C33.4018 36.3159 36.3154 33.4023 36.3154 29.8081C36.3154 26.2139 33.4018 23.3003 29.8076 23.3003C26.2134 23.3003 23.2998 26.2139 23.2998 29.8081C23.2998 33.4023 26.2134 36.3159 29.8076 36.3159Z"
          stroke="currentColor"
          strokeWidth="3.90469"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M68.854 49.3312L58.8124 39.2897C57.592 38.0696 55.9371 37.3843 54.2114 37.3843C52.4858 37.3843 50.8308 38.0696 49.6104 39.2897L20.0454 68.8547"
          stroke="currentColor"
          strokeWidth="3.90469"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Media({
  mediaKey,
  alt,
  className,
  src,
  width = 600,
  height = 600,
}: PropsWithClassName<MediaProps>) {
  const [status, setStatus] = useState<"loading" | "error" | "loaded">(
    "loading",
  );
  const mediaSrc = getMediaSrc(src, mediaKey, width, height);
  const mediaFormat = mediaSrc?.split(".").pop() === "mp4" ? "video" : "image";

  if (!mediaSrc || status === "error") {
    return <MediaPlaceholder className={className} />;
  }

  if (mediaFormat === "video") {
    return (
      <video autoPlay className={cn("flex-shrink-0", className)} loop muted>
        <source src={mediaSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <>
      <div className="relative flex-shrink-0">
        {status === "loading" && (
          <Skeleton className="absolute inset-0 flex-shrink-0" />
        )}
        <Image
          unoptimized
          alt={alt}
          className={cn("flex-shrink-0", className)}
          onError={() => setStatus("error")}
          onLoadStart={() => setStatus("loading")}
          onLoad={() => setStatus("loaded")}
          src={mediaSrc}
          height={height}
          width={width}
        />
      </div>
    </>
  );
}
