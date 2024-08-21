"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn, focusableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";
import { Typography } from "@ark-market/ui/typography";

import { homepageConfig } from "~/config/homepage";

export default function ExploreCollection() {
  const [exploreCollectionsToShow, setExploreCollectionsToShow] = useState(6);
  const canShowMoreExploreCollectionsItems =
    exploreCollectionsToShow < homepageConfig.exploreCollections.length;

  function showMoreCollectionsToExplore() {
    setExploreCollectionsToShow((previous) =>
      Math.min(previous + 3, homepageConfig.exploreCollections.length),
    );
  }

  function showLessCollectionsToExplore() {
    setExploreCollectionsToShow(6);
  }

  if (homepageConfig.exploreCollections.length === 0) {
    return;
  }

  return (
    <section>
      <Typography asChild variant="h2">
        <h2>Explore Collections</h2>
      </Typography>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homepageConfig.exploreCollections
          .slice(0, exploreCollectionsToShow)
          .map((collection, index) => {
            return (
              <Link
                href={`/collection/${collection.address}`}
                key={index}
                className={cn("group", focusableStyles)}
              >
                <div>
                  {collection.banner_image !== undefined ? (
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={collection.banner_image}
                        className="aspect-video transition-transform group-hover:scale-110"
                        alt={collection.name}
                        height={512}
                        width={932}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg bg-secondary" />
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <Image
                      className="aspect-square w-16 rounded-sm"
                      src={collection.image}
                      alt={collection.name}
                      height={124}
                      width={124}
                    />
                    <h4 className="text-xl font-semibold">{collection.name}</h4>
                    <VerifiedIcon className="text-background" />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="mt-16 flex justify-center">
        {canShowMoreExploreCollectionsItems ? (
          <Button variant="outline" onClick={showMoreCollectionsToExplore}>
            View more
          </Button>
        ) : (
          <Button variant="outline" onClick={showLessCollectionsToExplore}>
            View less
          </Button>
        )}
      </div>
    </section>
  );
}
