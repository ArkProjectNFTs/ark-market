"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { CarouselApi } from "@ark-market/ui/carousel";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";

import { homepageConfig } from "~/config/homepage";

const AUTO_SLIDE_INTERVAL = 8_000;

export default function MainCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedItem, setSelectedItem] = useState(
    api?.selectedScrollSnap() ?? 0,
  );
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (api) {
      const progressInterval = setInterval(() => {
        setProgressPercentage((prev) => (prev < 100 ? prev + 1 : 0));
      }, AUTO_SLIDE_INTERVAL / 100);

      const autoSlideInterval = setInterval(() => {
        const nextIndex =
          (selectedItem + 1) % homepageConfig.mainCarousel.length;
        api.scrollTo(nextIndex);
        setProgressPercentage(0);
      }, AUTO_SLIDE_INTERVAL);

      return () => {
        clearInterval(progressInterval);
        clearInterval(autoSlideInterval);
      };
    }
  }, [api, selectedItem]);

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setSelectedItem(api.selectedScrollSnap());
        setProgressPercentage(0);
      });
    }
  }, [api]);

  if (homepageConfig.mainCarousel.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {homepageConfig.mainCarousel.map((carouselItem, index) => {
            return (
              <CarouselItem className="basis-full" key={index}>
                <div className="relative h-[30rem] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={carouselItem.bannerSrc}
                    height={555}
                    width={1448}
                    alt={carouselItem.name}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex items-end justify-between p-12"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 54.6%, rgba(0, 0, 0, 0.80) 107.55%)",
                    }}
                  >
                    <div className="flex h-[7.5rem] items-center gap-6">
                      <Image
                        src={carouselItem.collectionSrc}
                        height={120}
                        width={120}
                        alt={carouselItem.name}
                        className="h-full rounded-lg"
                      />
                      <div className="flex h-full max-w-lg flex-col justify-between">
                        <h1 className="text-5xl font-extrabold">
                          {carouselItem.name}
                        </h1>
                        <p className="text-xl">{carouselItem.description}</p>
                      </div>
                    </div>
                    <Button size="xxl" asChild>
                      <Link href={`/collection/${carouselItem.address}`}>
                        {" "}
                        View collection
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-4">
          {homepageConfig.mainCarousel.map((_, index) => {
            const isSelected = selectedItem === index;
            const progressWidth =
              isSelected && progressPercentage > 0
                ? `${progressPercentage}%`
                : "0%";

            return (
              <button
                className={cn(
                  "relative h-1.5 w-24 overflow-hidden rounded-full",
                  "bg-card",
                )}
                key={index}
                onClick={() => {
                  api?.scrollTo(index);
                  setProgressPercentage(0);
                }}
              >
                <div
                  className="absolute bottom-0 left-0 top-0 bg-accent transition-[width]"
                  style={{ width: progressWidth }}
                ></div>
              </button>
            );
          })}
        </div>
      </Carousel>
    </div>
  );
}
