"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useCreateAuction, useCreateListing } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import moment from "moment";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { DateTimePicker } from "@ark-market/ui/date-time-picker";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import { EthInput } from "@ark-market/ui/eth-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ark-market/ui/form";
import { Check, List, LoaderCircle } from "@ark-market/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";
import { useToast } from "@ark-market/ui/use-toast";

import type { WalletToken } from "~/app/wallet/[walletAddress]/queries/getWalletData";
import type { Token } from "~/types";
import durations from "~/constants/durations";
import { env } from "~/env";
import usePrices from "~/hooks/usePrices";
import useTokenMarketdata from "~/hooks/useTokenMarketData";
import formatAmount from "~/lib/formatAmount";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";
import TokenActionsTokenOverview from "./token-actions-token-overview";

import useCollection from "~/hooks/useCollection";

interface TokenActionsCreateListingProps {
  token: Token | WalletToken;
  small?: boolean;
  children?: ReactNode;
}

export function TokenActionsCreateListing({
  token,
  small,
  children,
}: TokenActionsCreateListingProps) {
  const { account } = useAccount();
  const { data: tokenMarketData } = useTokenMarketdata({
    collectionAddress: token.collection_address,
    tokenId: token.token_id,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const { data: collection } = useCollection({ address:token.collection_address })
  const { createListing, status } = useCreateListing();
  const { create: createAuction, status: auctionStatus } = useCreateAuction();
  const { toast } = useToast();
  const { convertInUsd } = usePrices();

  const formSchema = z
    .object({
      startAmount: z.string().refine((val) => Number(val) >= 0.00001, {
        message: "Must be a valid amount and greater than 0.00001",
      }),
      endAmount: z.string().refine(
        (val) => {
          if (!isAuction) {
            return true;
          }

          const num = parseFloat(val);

          return !isNaN(num) && num >= 0.00001;
        },
        {
          message: "Must be a valid amount and greater than 0.00001",
        },
      ),
      duration: z.string().optional(),
      endDateTime: z.date().optional(),
    })
    .refine(
      (data) => {
        if (!isAuction) {
          return true;
        }

        const sa = Number(data.startAmount);
        const ea = Number(data.endAmount);

        return ea > sa;
      },
      {
        message: "Must be greater than starting price",
        path: ["endAmount"],
      },
    );

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: "",
      endAmount: "",
      duration: "719",
      endDateTime: undefined,
      username: "",
    },
  });

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Listing canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
            collectionName={token.collection_name}
            tokenId={token.token_id}
            tokenMetadata={token.metadata}
          />
        ),
      });
    } else if (status === "success") {
      setIsOpen(false);

      toast({
        variant: "success",
        title: "Your token is successfully listed!",
        additionalContent: (
          <ToastExecutedTransactionContent
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
            collectionName={token.collection_name}
            tokenId={token.token_id}
            tokenMetadata={token.metadata}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (auctionStatus === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Auction canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
            collectionName={token.collection_name}
            tokenId={token.token_id}
            tokenMetadata={token.metadata}
          />
        ),
      });
    } else if (auctionStatus === "success") {
      setIsOpen(false);

      toast({
        variant: "success",
        title: "Auction successfully launched",
        additionalContent: (
          <ToastExecutedTransactionContent
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
            collectionName={token.collection_name}
            tokenId={token.token_id}
            tokenMetadata={token.metadata}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionStatus]);

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
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
      endAmount: values.endAmount ? parseEther(values.endAmount) : BigInt(0),
      endDate: values.endDateTime
        ? moment(values.endDateTime).unix()
        : moment().add(values.duration, "hours").unix(),
    };

    try {
      if (isAuction) {
        await createAuction({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
          tokenId: processedValues.tokenId,
          endDate: processedValues.endDate,
          startAmount: processedValues.startAmount,
          endAmount: processedValues.endAmount,
        });
      } else {
        await createListing({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
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

  const formattedCollectionFloor = formatEther(BigInt(collection?.floor ?? 0));

  const isDisabled =
    !form.formState.isValid ||
    form.formState.isSubmitting ||
    status === "loading" ||
    auctionStatus === "loading";

  const startAmountInUsd = convertInUsd({ amount: parseEther(startAmount) });
  const isLoading = status === "loading" || auctionStatus === "loading";
  const isTriggerLoading = status === "success" || auctionStatus === "success";
  const isTriggerDisabled =
    isTriggerLoading || tokenMarketData?.buy_in_progress;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            className={cn(small ?? "relative w-full lg:max-w-[50%]")}
            size={small ? "xl" : "xxl"}
            disabled={isTriggerDisabled}
          >
            {isTriggerLoading ? (
              <LoaderCircle
                className={cn("animate-spin", small ?? "absolute left-4")}
                size={small ? 20 : 24}
              />
            ) : (
              <List
                size={small ? 20 : 24}
                className={cn("left-4", small ? "" : "absolute")}
              />
            )}
            List for sale
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle className="sr-only">Create listing</DialogTitle>
        <div className="flex flex-col gap-8">
          <div className="mt-4 text-center text-xl font-semibold">
            List for sale
          </div>
          <TokenActionsTokenOverview token={token} amount={startAmount} small />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormItem className="!mt-0">
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
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Set {isAuction && "starting"} price
                    </FormLabel>
                    <Button
                      type="button"
                      className="relative w-full"
                      variant="outline"
                      size="xl"
                      onClick={async () => {
                        form.setValue(
                          "startAmount",
                          field.value === formattedCollectionFloor
                            ? ""
                            : formattedCollectionFloor,
                        );
                        await form.trigger("startAmount");
                      }}
                    >
                      <div className="absolute left-3 flex size-5 items-center justify-center rounded-xs bg-secondary">
                        {field.value === formattedCollectionFloor && <Check />}
                      </div>
                      <p>
                        Choose floor price of{" "}
                        <span className="font-bold">
                          {formattedCollectionFloor} ETH
                        </span>
                      </p>
                    </Button>
                    <FormControl>
                      <EthInput
                        {...field}
                        status={fieldState.error?.message ? "error" : "default"}
                        autoFocus
                      />
                    </FormControl>
                    {fieldState.error?.message ? (
                      <FormMessage />
                    ) : (
                      <p className="!mt-1 ml-3 text-sm font-medium text-muted-foreground">
                        $<span>{startAmountInUsd}</span>
                      </p>
                    )}
                  </FormItem>
                )}
              />
              {isAuction && (
                <FormField
                  control={form.control}
                  name="endAmount"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Set reserve price
                      </FormLabel>
                      <FormControl>
                        <EthInput
                          {...field}
                          onChange={async (e) => {
                            field.onChange(e);
                            await form.trigger("endAmount");
                          }}
                          status={
                            fieldState.error?.message ? "error" : "default"
                          }
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
                render={({ field: durationField }) => (
                  <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field: endDateTimeField }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Listing expiration
                          </FormLabel>
                          <div className="grid grid-cols-[1fr_2fr] gap-4">
                            <Select
                              onValueChange={(value) => {
                                if (value.length === 0) {
                                  return;
                                }
                                durationField.onChange(value);
                                endDateTimeField.onChange(undefined);
                              }}
                              value={
                                durationField.value === "custom"
                                  ? undefined
                                  : durationField.value
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Custom">
                                    {durationField.value === "custom"
                                      ? "Custom"
                                      : durations[durationField.value]}
                                  </SelectValue>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 hour</SelectItem>
                                <SelectItem value="3">3 hours</SelectItem>
                                <SelectItem value="6">6 hours</SelectItem>
                                <SelectItem value="24">1 day</SelectItem>
                                <SelectItem value="72">3 days</SelectItem>
                                <SelectItem value="168">7 days</SelectItem>
                                <SelectItem value="719">1 month</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            <DateTimePicker
                              hourCycle={12}
                              value={
                                durationField.value === "custom"
                                  ? endDateTimeField.value
                                  : moment()
                                      .add(form.getValues("duration"), "hours")
                                      .toDate()
                              }
                              onChange={(value) => {
                                endDateTimeField.onChange(value);
                                durationField.onChange("custom");
                              }}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )}
              />

              <div className="!mt-8 text-xl font-semibold">
                <div className="flex items-center justify-between">
                  <p>Earning details</p>
                  <p>--- ETH</p>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
                  <p>Arkmarket fees 2%</p>
                  <p>-- ETH</p>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-sm font-medium text-muted-foreground">
                  <p>Creator royalties 2%</p>
                  <p>-- ETH</p>
                </div>
              </div>
              <div className="sticky bottom-0 !mt-8 flex w-full translate-y-5 items-center justify-center bg-background pb-5">
                <Button
                  type="submit"
                  className="mx-auto w-full px-10 lg:w-auto"
                  disabled={isDisabled}
                  size="xl"
                >
                  {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
                  <p>
                    List
                    {startAmount ? (
                      <>
                        {" "}
                        for{" "}
                        <span className="font-bold">
                          {formatAmount(startAmount)} ETH
                        </span>
                      </>
                    ) : null}
                  </p>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
