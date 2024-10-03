"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn, focusableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { VerifiedIcon, ViewMore } from "@ark-market/ui/icons";

import { homepageConfig } from "~/config/homepage";
import ExploreCollectionCard from "./explore-collection-card";

export default function ExploreCollection() {
  const [exploreCollectionsToShow, setExploreCollectionsToShow] = useState(5);
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homepageConfig.exploreCollections
          .slice(0, exploreCollectionsToShow)
          .map((collection, index) => {
            return (
              <React.Fragment key={index}>
                {index === 1 && <ExploreCollectionCard />}
                <Link
                  href={`/collection/${collection.address}`}
                  className={cn(
                    "group overflow-hidden rounded-lg border border-border bg-card transition-transform hover:scale-[1.02]",
                    focusableStyles,
                  )}
                >
                  <div>
                    {collection.banner_image !== undefined ? (
                      <div className="aspect-video w-full overflow-hidden">
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
                    <div className="flex items-center gap-2 px-3 py-4">
                      <Image
                        className="aspect-square w-16 rounded-sm"
                        src={collection.image}
                        alt={collection.name}
                        height={124}
                        width={124}
                        unoptimized={collection.image.endsWith(".gif")}
                      />
                      <h4 className="text-xl font-semibold">
                        {collection.name}
                      </h4>
                      <VerifiedIcon className="text-primary" />
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
      </div>
      <div className="mt-16 flex justify-center">
        {canShowMoreExploreCollectionsItems ? (
          <Button variant="outline" onClick={showMoreCollectionsToExplore}>
            <ViewMore />
            <p>View more</p>
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
