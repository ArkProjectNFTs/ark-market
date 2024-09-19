"use client";

import CollectionActivityData from "./collection-activity-data";

interface CollectionProps {
  collectionAddress: string;
  collectionTokenCount: number;
}

export default function CollectionActivity({
  collectionAddress,
}: CollectionProps) {
  return (
    <div className="w-full">
      <CollectionActivityData collectionAddress={collectionAddress} />
    </div>
  );
}
