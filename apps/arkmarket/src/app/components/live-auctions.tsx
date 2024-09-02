"use client";

import Image from "next/image";
import Link from "next/link";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { TimerReset } from "@ark-market/ui/icons";

import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import { Card, CardContent, CardFooter } from "@ark-market/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";

import { homepageConfig } from "~/config/homepage";

export default function LiveAuctions() {
  if (homepageConfig.liveAuctions.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold">Live auctions</h2>
      <Carousel
        className="mt-8"
        plugins={[WheelGesturesPlugin()]}
        opts={{ skipSnaps: true }}
      >
        <CarouselContent>
          {homepageConfig.liveAuctions.map((collection, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-[calc(100%-3rem)] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <Link
                  href=""
                  key={index}
                  className={cn("group", focusableStyles)}
                >
                  <Card className="overflow-hidden border-none">
                    <CardContent className="p-0">
                      {collection.image ? (
                        <div className="aspect-square w-full overflow-hidden">
                          <Image
                            src={collection.image}
                            height={500}
                            width={500}
                            alt={collection.name}
                            className="aspect-square w-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="aspect-square bg-secondary" />
                      )}
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
                      </div>
                      <p className="mt-2.5 flex gap-1.5 font-medium text-muted-foreground">
                        <TimerReset size={20} /> End in 2d 8h 56min 23s
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
