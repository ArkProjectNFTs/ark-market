"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { shortAddress, timeSinceShort } from "@ark-market/ui";
import { ShoppingCart, VerifiedIcon } from "@ark-market/ui/icons";
import { Marquee } from "@ark-market/ui/marquee";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import Media from "~/components/media";
import getHomepageLatestSales from "~/lib/getHomepageLatestSales";

export default function LatestSales() {
  const { data } = useQuery({
    queryKey: ["home-page-latest-sales"],
    queryFn: () => getHomepageLatestSales(),
    refetchInterval: 10_000,
  });

  if (data === undefined || data.data.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="relative w-full overflow-hidden">
        <Marquee className="[--duration:20s]">
          <p className="whitespace-nowrap text-[12.15rem] font-bold leading-[12.15rem]">
            Latest sale
          </p>
          <p
            className="whitespace-nowrap text-[12.15rem] font-bold leading-[12.15rem] text-transparent dark:hidden"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "black",
            }}
          >
            Latest sale
          </p>
          <p
            className="hidden whitespace-nowrap text-[12.15rem] font-bold leading-[12.15rem] text-transparent dark:block"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "white",
            }}
          >
            Latest sale
          </p>
        </Marquee>
      </div>

      <div className="h-[34rem] overflow-auto rounded-[32px] border border-foreground md:mt-12">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-background">
              <TableHead>
                <p className="pl-3">Event</p>
              </TableHead>
              <TableHead>
                <p className="py-3">Token</p>
              </TableHead>
              <TableHead>
                <p className="py-3">Price</p>
              </TableHead>
              <TableHead>
                <p className="py-3">From</p>
              </TableHead>
              <TableHead>
                <p className="py-3">To</p>
              </TableHead>
              <TableHead>
                <p className="py-3">Date</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm font-semibold">
            {data.data.map((sale, index) => {
              // TOOD @YohanTz: Proper key when real data
              return (
                <TableRow
                  key={index}
                  className="group h-[5.75rem] text-muted-foreground"
                >
                  <TableCell className="text-foreground transition-colors group-hover:text-muted-foreground">
                    <div className="flex items-center gap-4 pl-3">
                      <ShoppingCart /> Sale
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex min-w-44 items-center gap-4">
                      <Media
                        className="size-14 rounded-xs"
                        alt={sale.metadata?.name ?? "Unknown"}
                        src={sale.metadata?.image}
                        mediaKey={sale.metadata?.image_key}
                        height={112}
                        width={112}
                      />
                      <div className="overflow-hidden whitespace-nowrap">
                        <p className="overflow-hidden text-ellipsis text-base font-medium text-foreground">
                          {sale.metadata?.name ?? "Unknown"}
                        </p>
                        <Link
                          href={`/collection/${sale.collection_address}`}
                          className="flex items-center gap-1 transition-colors hover:text-primary"
                        >
                          {sale.collection_name}
                          <VerifiedIcon className="text-primary" />
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    <PriceTag price={sale.price} />
                  </TableCell>
                  <TableCell className="text-primary">
                    <Link href={`/wallet/${sale.from}`}>
                      {shortAddress(sale.from)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-primary">
                    <Link href={`/wallet/${sale.to}`}>
                      {shortAddress(sale.to)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-foreground transition-colors group-hover:text-muted-foreground">
                    {timeSinceShort(sale.timestamp)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
