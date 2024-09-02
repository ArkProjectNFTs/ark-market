"use client";

import { useState } from "react";
import { useStarkProfile } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import useBlockies from "~/hooks/useBlockies";

interface ProfilePictureProps {
  address: string;
}

export default function ProfilePicture({ address }: ProfilePictureProps) {
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
        className="size-6 rounded-full lg:size-8"
        alt="Starknet Id profile"
        src={starkProfile.profilePicture}
        onError={() => setHasImageFailed(true)}
      />
    );
  }

  return (
    <img
      className="size-6 rounded-full lg:size-8"
      alt="Blockies"
      src={blockiesImageSrc}
    />
  );
}
