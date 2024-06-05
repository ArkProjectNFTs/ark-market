/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";

import { env } from "~/env";

interface MediaProps {
  src: string;
  alt: string;
}

export default function Media({
  className,
  src,
  alt,
}: PropsWithClassName<MediaProps>) {
  const [hasFailedToLoad, setHasFailedToLoad] = useState(false);

  const mediaSrc = src.replace("ipfs://", env.NEXT_PUBLIC_IPFS_GATEWAY);
  const mediaFormat = mediaSrc?.split(".").pop() === "mp4" ? "video" : "image";

  console.log(src, mediaSrc);
  if (mediaSrc === undefined || mediaSrc.length === 0 || hasFailedToLoad) {
    return (
      <div className={className}>Loading...</div>
      // <Image
      //   alt={alt}
      //   className={className}
      //   src={`/medias/${resolvedTheme === "dark" ? "dark/" : ""}empty_nft.png`}
      // />
    );
  }

  if (mediaFormat === "video") {
    return (
      <video autoPlay className={className} loop muted>
        <source src={mediaSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return (
      <img
        alt={alt}
        className={className}
        // onError={() => setHasFailedToLoad(true)}
        src={mediaSrc}
      />
    );
  }
}
