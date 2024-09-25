"use client";

import { useState } from "react";
import { useStarkProfile } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import useBlockies from "~/hooks/useBlockies";

interface ProfilePictureProps {
  address: string;
  className?: string;
}

export default function ProfilePicture({
  address,
  className,
}: ProfilePictureProps) {
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  const { blockiesImageSrc } = useBlockies({
    address: validateAndParseAddress(address),
  });
  const [hasImageFailed, setHasImageFailed] = useState(false);

  if (
    starkProfile?.name !== undefined &&
    starkProfile.profilePicture !== undefined &&
    !hasImageFailed
  ) {
    return (
      <img
        className={className}
        alt="Starknet Id profile"
        src={starkProfile.profilePicture}
        onError={() => setHasImageFailed(true)}
      />
    );
  }

  return <img className={className} alt="Blockies" src={blockiesImageSrc} />;
}
