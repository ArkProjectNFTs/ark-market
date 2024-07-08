import { Button } from "@ark-market/ui/button";

import ExploreCategory from "./components/explore-category";
import ExploreCollection from "./components/explore-collection";
import LatestDrop from "./components/latest-drop";
import LiveAuctions from "./components/live-auctions";
import MainCarousel from "./components/main-carousel";
import TrendingNow from "./components/trending-now";

export default function HomePage() {
  return (
    <main>
      <div className="mx-auto mt-8 flex max-w-[120rem] flex-col gap-16 px-8 pb-8">
        <MainCarousel />
        <ExploreCategory />
        <LatestDrop />
        <TrendingNow />
        <ExploreCollection />
        <LiveAuctions />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex w-full flex-col gap-8 rounded-lg bg-card p-8 md:flex-row md:items-center">
            <div className="size-28 flex-shrink-0 rounded-lg bg-secondary md:size-48" />
            <div className="flex h-full flex-col items-start justify-between gap-3.5 md:gap-0">
              <h2 className="text-3xl font-semibold">Need help?</h2>
              <p>Lorem ipsum...</p>
              <Button size="xl">Contact support</Button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 rounded-lg bg-card p-8 md:flex-row md:items-center">
            <div className="size-28 flex-shrink-0 rounded-lg bg-secondary md:size-48" />
            <div className="flex h-full flex-col items-start justify-between gap-3.5 md:gap-0">
              <h2 className="text-3xl font-semibold">
                Get your collection verified
              </h2>
              <p>Lorem ipsum...</p>
              <Button size="xl">Submit your collection</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
