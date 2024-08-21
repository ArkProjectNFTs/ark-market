"use client";

import { useEffect, useRef, useState } from "react";
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
import EthereumLogo2 from "@ark-market/ui/icons/ethereum-logo-2";
import { Typography } from "@ark-market/ui/typography";

import { homepageConfig } from "~/config/homepage";

const AUTO_SLIDE_INTERVAL = 8_000;

export default function MainCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedItem, setSelectedItem] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const intervalId = useRef<number | null>(null);
  const progressIntervalId = useRef<number | null>(null);

  const startProgress = () => {
    progressIntervalId.current = window.setInterval(() => {
      setProgressPercentage((prev) => (prev < 100 ? prev + 1 : 0));
    }, AUTO_SLIDE_INTERVAL / 100);
  };

  const startAutoSlide = () => {
    intervalId.current = window.setInterval(() => {
      const nextIndex = (selectedItem + 1) % homepageConfig.mainCarousel.length;
      api?.scrollTo(nextIndex);
      setProgressPercentage(0);
    }, AUTO_SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => {
    if (intervalId.current) clearInterval(intervalId.current);
    if (progressIntervalId.current) clearInterval(progressIntervalId.current);
  };

  useEffect(() => {
    if (api) {
      startProgress();
      startAutoSlide();

      return () => {
        stopAutoSlide();
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
    <div className="md:text-white">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {homepageConfig.mainCarousel.map((carouselItem, index) => {
            return (
              <CarouselItem className="basis-full" key={index}>
                <div className="relative">
                  <Image
                    src={carouselItem.bannerSrc}
                    height={555}
                    width={1448}
                    alt={carouselItem.name}
                    className="h-[22.5rem] w-full rounded-[1.5rem] object-cover md:h-[35rem]"
                  />
                  <div
                    className="mt-5 flex flex-col justify-center gap-5 rounded-[1.5rem] md:absolute md:inset-0 md:mt-0 md:items-start md:gap-8 md:p-12"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 54.6%, rgba(0, 0, 0, 0.80) 107.55%)",
                    }}
                  >
                    <div className="flex gap-4 md:flex-col md:gap-8">
                      <Image
                        src={carouselItem.collectionSrc}
                        height={120}
                        width={120}
                        alt={carouselItem.name}
                        className="size-16 rounded-lg"
                      />
                      <div className="flex flex-col gap-2 md:gap-8">
                        <h1 className="text-3xl font-extrabold md:text-5xl">
                          {carouselItem.name}
                        </h1>
                        <div className="flex items-center">
                          <Typography className="mr-1" variant="button_text_s">
                            {carouselItem.itemsCount}
                          </Typography>
                          <Typography
                            className="mr-1 text-muted-foreground"
                            variant="button_text_s"
                          >
                            ITEMS
                          </Typography>{" "}
                          | <EthereumLogo2 className="size-4" />
                          <Typography className="mr-1" variant="button_text_s">
                            {carouselItem.floorPrice}
                          </Typography>
                          <Typography
                            className="text-muted-foreground"
                            variant="button_text_s"
                          >
                            ETH
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <p className="text-base md:max-w-lg md:text-xl">
                      {carouselItem.description}
                    </p>
                    <Button size="xxl" asChild className="flex-shrink-0">
                      <Link href={`/collection/${carouselItem.address}`}>
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
                  stopAutoSlide();
                  startProgress();
                  startAutoSlide();
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
