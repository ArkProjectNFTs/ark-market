"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  getRoundedRemainingTime,
} from "@ark-market/ui";
import { Card, CardContent, CardFooter } from "@ark-market/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";
import { TimerReset } from "@ark-market/ui/icons";

import Media from "~/components/media";
import getHomepageLiveAuctions from "~/lib/getHomepageLiveAuctions";
import LiveAuctionsCard from "./live-auctions-card";

export default function LiveAuctions() {
  const { data } = useQuery({
    queryKey: ["home-page-live-auctions"],
    queryFn: () => getHomepageLiveAuctions(),
    refetchInterval: 10_000,
  });

  if (data === undefined || data.data.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-6 sm:mb-0 sm:hidden">
        <LiveAuctionsCard />
      </div>
      <Carousel
        plugins={[WheelGesturesPlugin()]}
        opts={{ skipSnaps: true }}
        className="-mr-8"
      >
        <CarouselContent className="mr-12">
          <CarouselItem className="hidden basis-full sm:block sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
            <LiveAuctionsCard />
          </CarouselItem>
          {data.data.map((auction, index) => {
            return (
              <React.Fragment key={index}>
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
                  <Link
                    href={`/token/${auction.collection_address}/${auction.token_id}`}
                    key={index}
                    className={cn("group", focusableStyles)}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-square w-full overflow-hidden">
                          <Media
                            src={auction.metadata?.image}
                            mediaKey={auction.metadata?.image_key}
                            height={500}
                            width={500}
                            alt={auction.metadata?.name ?? "Unknown"}
                            className="aspect-square w-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start px-4 pb-6 pt-4">
                        <div className="flex w-full items-center gap-1.5">
                          <h4
                            className={cn(
                              "text-xl font-semibold",
                              ellipsableStyles,
                            )}
                          >
                            {auction.metadata?.name ?? "Unknown Token"}
                          </h4>
                        </div>
                        <p className="mt-2.5 flex items-center gap-1.5 font-medium text-muted-foreground">
                          <TimerReset size={20} />
                          End in{" "}
                          {getRoundedRemainingTime(auction.end_timestamp)}
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              </React.Fragment>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
