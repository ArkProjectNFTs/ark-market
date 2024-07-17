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

import type { Token } from "~/types";
import { env } from "~/env";
import useBalance from "~/hooks/useBalance";
import useConnectWallet from "~/hooks/useConnectWallet";
import formatAmount from "~/lib/formatAmount";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsMakeOfferProps {
  token: Token;
}

function TokenActionsMakeOffer({ token }: TokenActionsMakeOfferProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useConfig();
  const { account } = useAccount();
  const { createOffer, status } = useCreateOffer();
  const { data } = useBalance();
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
          message: "Insufficient balance",
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
      toast.error("Offer creation failed.");
    } else if (status === "success") {
      setIsOpen(false);
      toast.success("Your offer is successfully sent.");
    }
  }, [status]);

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
          className="relative w-full lg:max-w-[50%]"
          size="xxl"
          variant="secondary"
          onClick={ensureConnect}
        >
          <Tag size={24} className="absolute left-4" />
          Make offer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-center"></DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="mx-auto size-20 rounded-full bg-secondary" />
          <div className="text-center text-xl font-semibold">Make an offer</div>
          <TokenActionsTokenOverview
            token={token}
            amount={formattedStartAmount}
            small
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="startAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set price</FormLabel>
                    <FormControl>
                      <NumericalInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    {formattedStartAmount !== "-" && <FormMessage />}
                  </FormItem>
                )}
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
