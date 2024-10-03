"use client";

import Image from "next/image";
import Link from "next/link";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import { Card, CardContent, CardFooter } from "@ark-market/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";
import { VerifiedIcon } from "@ark-market/ui/icons";

import { homepageConfig } from "~/config/homepage";
import LatestDropCard from "./latest-drop-card";
import LatestDropStatus from "./latest-drop-status";

export default function LatestDrop() {
  if (homepageConfig.latestDropCollections.length === 0) {
    return null;
  }

  return (
    <section>
      <Carousel plugins={[WheelGesturesPlugin()]} opts={{ skipSnaps: true }}>
        <CarouselContent>
          <CarouselItem className="basis-[calc(100%-3rem)] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
            <LatestDropCard />
          </CarouselItem>
          {homepageConfig.latestDropCollections.map((collection, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-[calc(100%-3rem)] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <Link
                  href={`/collection/${collection.address}`}
                  key={index}
                  className={cn("group", focusableStyles)}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-square w-full overflow-hidden">
                        <div className="absolute right-5 top-5 z-10">
                          <LatestDropStatus status={collection.status} />
                        </div>
                        <Image
                          src={collection.image}
                          height={500}
                          width={500}
                          alt={collection.name}
                          className="aspect-square w-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start p-5">
                      <div className="flex w-full items-center gap-1.5">
                        <h4
                          className={cn(
                            "text-xl font-semibold",
                            ellipsableStyles,
                          )}
                        >
                          {collection.name}
                        </h4>
                        <VerifiedIcon className="text-primary" />
                      </div>
                      <span className="mt-5 text-sm font-semibold text-muted-foreground">
                        Status
                      </span>
                      <p className="font-semibold text-primary">
                        Mint starts in 2 hours
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
