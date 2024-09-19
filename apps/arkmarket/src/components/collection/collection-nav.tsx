"use client";

import { usePathname } from "next/navigation";

import CollectionNavLink from "./collection-nav-link";

interface CollectionNavProps {
  collectionAddress: string;
}

export default function CollectionNav({
  collectionAddress,
}: CollectionNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-8 p-5">
      <CollectionNavLink
        href={`/collection/${collectionAddress}`}
        isActive={pathname === `/collection/${collectionAddress}`}
      >
        Items
      </CollectionNavLink>
      <CollectionNavLink
        href={`/collection/${collectionAddress}/activity`}
        isActive={pathname === `/collection/${collectionAddress}/activity`}
      >
        Activity
      </CollectionNavLink>
    </div>
  );
}
