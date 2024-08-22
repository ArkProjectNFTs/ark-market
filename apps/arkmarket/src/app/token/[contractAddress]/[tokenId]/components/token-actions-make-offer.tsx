"use client";

import { memo, useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { LoaderCircle, Tag } from "lucide-react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import * as z from "zod";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import EthInput from "@ark-market/ui/eth-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ark-market/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";
import { Typography } from "@ark-market/ui/typography";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token } from "~/types";
import { ETH } from "~/constants/tokens";
import { env } from "~/env";
import useBalance from "~/hooks/useBalance";
import useConnectWallet from "~/hooks/useConnectWallet";
import formatAmount from "~/lib/formatAmount";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsMakeOfferProps {
  token: Token;
  small?: boolean;
}

function TokenActionsMakeOffer({ token, small }: TokenActionsMakeOfferProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useConfig();
  const { account } = useAccount();
  const { createOffer, status } = useCreateOffer();
  const { toast } = useToast();
  const { data } = useBalance({ token: ETH });
  const { ensureConnect } = useConnectWallet({
    account,
    onConnect: () => {
      setIsOpen(true);
    },
  });

  const formSchema = z.object({
    startAmount: z
      .string()
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num > 0.0015;
        },
        {
          message: "Must be a valid amount and greater than 0.0015",
        },
      )
      .refine(
        (val) => {
          const num = parseEther(val);
          return num <= data.value;
        },
        {
          message: "You don't have enough funds in your wallet",
        },
      ),
    duration: z.string(),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: "",
      duration: "719",
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, isOpen]);

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Offer canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
          />
        ),
      });
    } else if (status === "success") {
      setIsOpen(false);
      toast({
        variant: "success",
        title: "Your offer is successfully sent",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
      return;
    }

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      currencyAddress: config?.starknetCurrencyContract,
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
      endDate: moment().add(values.duration, "hours").unix(),
    };

    await createOffer({
      starknetAccount: account,
      ...processedValues,
    });
  }

  const isLoading = status === "loading";
  const isDisabled =
    !form.formState.isValid ||
    form.formState.isSubmitting ||
    status === "loading";
  const startAmount = form.watch("startAmount");
  const formattedStartAmount = formatAmount(startAmount);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(small ?? "relative w-full lg:max-w-[50%]")}
          size={small ? "xl" : "xxl"}
          variant="secondary"
          onClick={ensureConnect}
        >
          <Tag
            size={small ? 20 : 24}
            className={cn(small ?? "absolute left-4")}
          />
          Make offer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-center"></DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="mx-auto size-20 rounded-full bg-secondary" />
          <Typography variant="h4" className="text-center">
            Make an offer
          </Typography>
          <TokenActionsTokenOverview token={token} amount={startAmount} small />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="startAmount"
                render={({ field, fieldState }) => {
                  return (
                    <FormItem>
                      <FormLabel>Set price</FormLabel>
                      <FormControl>
                        <EthInput
                          value={field.value}
                          onChange={field.onChange}
                          status={
                            formattedStartAmount !== "-" &&
                            fieldState.error?.message
                              ? "error"
                              : "default"
                          }
                        />
                      </FormControl>
                      {formattedStartAmount !== "-" && <FormMessage />}
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Offer expiration</FormLabel>
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
                        <SelectItem value="168">7 days</SelectItem>
                        <SelectItem value="719">1 month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="mx-auto w-full px-10 lg:w-auto"
                size="xl"
              >
                {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
                Make offer
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(TokenActionsMakeOffer);
