"use client";

import { useEffect, useState } from "react";
import { useCreateAuction, useCreateListing } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { List, LoaderCircle } from "lucide-react";
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
import { NumericalInput } from "@ark-market/ui/numerical-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";
import { toast } from "@ark-market/ui/toast";

import type { Collection, Token } from "~/types";
import { env } from "~/env";
import formatAmount from "~/lib/formatAmount";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsCreateListingProps {
  collection: Collection;
  token: Token;
}

export function TokenActionsCreateListing({
  collection,
  token,
}: TokenActionsCreateListingProps) {
  const { account } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const { createListing, status } = useCreateListing();
  const { create: createAuction, status: auctionStatus } = useCreateAuction();

  const formSchema = z
    .object({
      startAmount: z.string().refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num > 0;
        },
        {
          message: "Must be a valid amount",
        },
      ),
      endAmount: z
        .string()
        .refine(
          (val) => {
            const num = parseFloat(val);

            if (!isAuction) {
              return true;
            }

            return !isNaN(num);
          },
          {
            message: "Must be a valid amount",
          },
        )
        .optional(),
      duration: z.string(),
    })
    .refine(
      (data) => {
        if (!isAuction) {
          return true;
        }

        if (data.endAmount !== undefined) {
          const sa = parseFloat(data.startAmount);
          const ea = parseFloat(data.endAmount);
          return ea > sa;
        }
        return true;
      },
      {
        message: "Must be greater than start amount",
        path: ["endAmount"],
      },
    );

  const form = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: "",
      endAmount: "",
      duration: "729",
    },
  });

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast.error("Your token listing failed.");
    } else if (status === "success") {
      setIsOpen(false);
      toast.success("Your token is successfully listed.");
    }
  }, [status]);

  useEffect(() => {
    setIsAuction(false);
    form.reset();
  }, [form, isOpen]);

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
      if (isAuction) {
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
    } catch (error) {
      console.error("error: create listing failed", error);
    }
  }

  const startAmount = form.watch("startAmount");
  const formattedStartAmount = formatAmount(startAmount);
  const isLoading = status === "loading" || auctionStatus === "loading";

  const isDisabled =
    !form.formState.isValid ||
    form.formState.isSubmitting ||
    status === "loading" ||
    auctionStatus === "loading";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="relative w-full lg:max-w-[50%]" size="xxl">
          <List size={24} className="absolute left-4" />
          <span>List for sale</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-center"></DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="text-center text-xl font-semibold">List for sale</div>
          <TokenActionsTokenOverview
            collection={collection}
            token={token}
            amount={formattedStartAmount}
            small
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormItem className="">
                <FormLabel className="text-lg">Type of sale</FormLabel>
                <div className="flex gap-6">
                  <Button
                    type="button"
                    className="w-full"
                    size="xl"
                    variant={isAuction ? "outline" : "default"}
                    onClick={() => setIsAuction(false)}
                  >
                    Fixed price
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    size="xl"
                    variant={isAuction ? "default" : "outline"}
                    onClick={() => setIsAuction(true)}
                  >
                    In auction
                  </Button>
                </div>
              </FormItem>

              <FormField
                control={form.control}
                name="startAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Set {isAuction && "starting"} price
                    </FormLabel>
                    <Button
                      type="button"
                      className="w-full"
                      variant="outline"
                      size="xl"
                      onClick={() => {
                        field.onChange("0.5");
                      }}
                    >
                      <p>
                        Choose floor price of{" "}
                        <span className="font-bold">0.5 ETH</span>
                      </p>
                    </Button>
                    <FormControl>
                      <NumericalInput
                        // {...field}
                        defaultValue="0.1"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Price"
                      />
                    </FormControl>
                    <p className="!mt-1 ml-3 text-sm text-muted-foreground">
                      $---
                    </p>
                    {formattedStartAmount !== "-" && <FormMessage />}
                  </FormItem>
                )}
              />
              {isAuction && (
                <FormField
                  control={form.control}
                  name="endAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Set reserve price
                      </FormLabel>
                      <FormControl>
                        <NumericalInput
                          value={field.value}
                          onChange={field.onChange}
                        />
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
                    <FormLabel className="text-lg">
                      Listing expiration
                    </FormLabel>
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
                        <SelectItem value="168">7 days</SelectItem>
                        <SelectItem value="729">1 month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mx-auto !mt-8 w-full px-10 lg:w-auto"
                disabled={isDisabled}
                size="xl"
              >
                {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
                List
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
