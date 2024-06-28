"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@ark-market/ui/button";
import { Card, CardContent, CardFooter } from "@ark-market/ui/card";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import { homepageConfig } from "~/config/homepage";

export default function HomePage() {
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

  return (
    <main>
      <div className="h-[30rem] w-full bg-secondary" />
      <div className="mx-auto max-w-[160rem] px-8 pb-8">
        {homepageConfig.latestDropCollections.length !== 0 && (
          <>
            <h2 className="pt-10 text-3xl font-semibold">Latest drop</h2>
            <div className="mt-8 grid grid-cols-4 gap-6">
              {homepageConfig.latestDropCollections.map((collection, index) => {
                return (
                  <Link href="/" key={index}>
                    <Card className="overflow-hidden border-none">
                      <CardContent className="p-0">
                        <div className="aspect-square bg-secondary" />
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xl font-semibold">
                            {collection.name}
                          </h4>
                          <VerifiedIcon className="text-background" />
                        </div>
                        <span className="mt-5 text-sm font-medium text-muted-foreground">
                          Status
                        </span>
                        <p className="font-medium">Mint starts in 2 hours</p>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {homepageConfig.trendingCollections.length !== 0 && (
          <>
            <h2 className="pt-10 text-3xl font-semibold">Trending now</h2>
            <div className="mt-8 grid grid-cols-4 gap-6">
              {homepageConfig.trendingCollections.map((collection, index) => {
                return (
                  <Link href={`/collection/${collection.address}`} key={index}>
                    <Card className="overflow-hidden border-none">
                      <CardContent className="p-0">
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          objectFit="cover"
                          // layout="fill"
                          height={600}
                          width={600}
                          className="aspect-square w-full"
                        />
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xl font-semibold">
                            {collection.name}
                          </h4>
                          <VerifiedIcon className="text-background" />
                        </div>
                        <span className="mt-5 text-sm font-medium text-muted-foreground">
                          Floor price
                        </span>
                        <p className="font-medium">
                          1.6 ETH{" "}
                          <span className="font-bold text-green-500">
                            +0.02%
                          </span>
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {homepageConfig.exploreCollections.length !== 0 && (
          <>
            <h2 className="pt-10 text-3xl font-semibold">
              Explore Collections
            </h2>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {homepageConfig.exploreCollections
                .slice(0, exploreCollectionsToShow)
                .map((collection, index) => {
                  return (
                    <Link
                      href={`/collection/${collection.address}`}
                      key={index}
                    >
                      <div>
                        {collection.banner_image !== undefined ? (
                          <Image
                            src={collection.banner_image}
                            className="aspect-video rounded-lg"
                            alt={collection.name}
                            height={512}
                            width={932}
                          />
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
                          <h4 className="text-xl font-semibold">
                            {collection.name}
                          </h4>
                          <VerifiedIcon className="text-background" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className="mt-16 flex justify-center">
              {canShowMoreExploreCollectionsItems ? (
                <Button
                  variant="outline"
                  onClick={showMoreCollectionsToExplore}
                >
                  View more
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={showLessCollectionsToExplore}
                >
                  View less
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
