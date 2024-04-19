import React from "react";

import type { CollectionMetadata } from "../queries/fetchCollectionMetadata";

interface HeaderProps {
  collectionMetadata: CollectionMetadata;
}

const Header = ({ collectionMetadata }: HeaderProps) => {
  console.log("collectionMetadata", collectionMetadata);
  if (!collectionMetadata) return null;
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {collectionMetadata.name
          ? collectionMetadata.name
          : "Missing name information"}
      </div>
    </div>
  );
};

export default Header;
