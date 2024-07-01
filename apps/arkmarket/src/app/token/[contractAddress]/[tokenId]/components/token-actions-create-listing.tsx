"use client";

import { useState } from "react";
import { useCreateAuction, useCreateListing } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { List } from "lucide-react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import * as z from "zod";

import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ark-market/ui/form";
import { Input } from "@ark-market/ui/input";
import { RadioGroup, RadioGroupItem } from "@ark-market/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";

import type { Token, TokenMarketData } from "~/types";
import TokenMedia from "~/app/assets/[contract_address]/[token_id]/components/token-media";
import { env } from "~/env";

interface TokenActionsCreateListingProps {
  token: Token;
  tokenMarketData?: TokenMarketData;
}

const FIXED = "fixed";
const AUCTION = "auction";

const formSchema = z.object({
  startAmount: z.string({
    invalid_type_error: "Please enter a valid amount",
  }),
  endAmount: z
    .string({
      invalid_type_error: "Please enter a valid amount",
    })
    .optional(),
  duration: z.string(),
  type: z.enum([FIXED, AUCTION]),
});

export function TokenActionsCreateListing({
  token,
  // tokenMarketData,
}: TokenActionsCreateListingProps) {
  const { account } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const { createListing, status } = useCreateListing();
  const { create: createAuction, status: auctionStatus } = useCreateAuction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      type: FIXED,
      startAmount: "0.1",
      duration: "1",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
      // TODO: Handle error with toast
      console.error("Account is missing");
      return;
    }

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      tokenAddress: token.contract_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
      endAmount: values.endAmount ? parseEther(values.endAmount) : BigInt(0),
      endDate: moment().add(values.duration, "hours").unix(),
    };

    try {
      if (values.type === AUCTION) {
        await createAuction({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.contract_address,
          tokenId: processedValues.tokenId,
          endDate: processedValues.endDate,
          startAmount: processedValues.startAmount,
          endAmount: processedValues.endAmount,
        });
      } else {
        await createListing({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.contract_address,
          tokenId: processedValues.tokenId,
          endDate: processedValues.endDate,
          startAmount: processedValues.startAmount,
        });
      }

      // queryClient.setQueryData(
      //   ["tokenMarketData", token.contract_address, token.token_id],
      //   {
      //     ...tokenMarketData,
      //     is_listed: true,
      //     type: values.type === AUCTION ? "AUCTION" ,
      //     start_amount: processedValues.startAmount,
      //     end_amount: processedValues.endAmount,
      //     end_date: processedValues.endDate,
      //   },
      // );
    } catch (error) {
      console.error("error: create listing failed", error);
    }
  }

  const isAuction = form.getValues("type") === AUCTION;
  // const duration = form.watch("duration");
  // const expiredAt = moment().add(duration, "hours").format("LLLL");
  const isLoading = status === "loading" || auctionStatus === "loading";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="relative w-full lg:max-w-[50%]" size="xl">
          <List size={24} className="absolute left-4" />
          <span>List for sale</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-center">
          {/* <DialogTitle>List for sale</DialogTitle> */}
        </DialogHeader>
        <div className="flex-row gap-10">
          <div className="text-center text-xl font-semibold">List for sale</div>
          <div className="flex items-center space-x-4">
            <div className="size-24 overflow-hidden rounded">
              <TokenMedia token={token} />
            </div>
            <div className="">
              <div className="font-bold">Duo #{token.token_id}</div>
              <div className="text-muted-foreground">Everai</div>
            </div>
            <div className="grow" />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Choose a type of sale</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="gap-0 rounded border"
                      >
                        <FormItem className="flex items-center justify-center border-b p-4">
                          <FormLabel className="text-md flex flex-grow flex-col space-y-2 font-normal">
                            <span className="font-semibold">Fixed price</span>
                            <span className="">
                              The item is listed at the price you set.
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem value={FIXED} className="h-6 w-6" />
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex items-center justify-center p-4">
                          <FormLabel className="text-md flex flex-grow flex-col space-y-2 font-normal">
                            <span className="font-semibold">
                              Sell to highest bidder
                            </span>
                            <span className="">
                              The item is listed for auction.
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem
                              value={AUCTION}
                              className="h-6 w-6"
                            />
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set starting price</FormLabel>
                    <FormControl>
                      <Input placeholder="Amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isAuction && (
                <FormField
                  control={form.control}
                  name="endAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Set reserve price</FormLabel>
                      <FormControl>
                        <Input placeholder="Amount" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Set expiration</FormLabel>
                      {/* <div className="text-sm">Expires {expiredAt}</div> */}
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="24">1 day</SelectItem>
                        <SelectItem value="72">3 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="" disabled={isLoading} size="xl">
                {isLoading ? "Loading..." : "Complete Listing"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
