import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { formatEther } from "viem";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { Token } from "~/types";

const MotionButton = motion(Button);

interface MobileTokenActionProps {
  show: boolean;
  token: Token;
}

export default function MobileTokenAction({
  show,
  token,
  className,
}: PropsWithClassName<MobileTokenActionProps>) {
  return (
    <AnimatePresence>
      {show && (
        <MotionButton
          initial={{ transform: "translateY(4.25rem)" }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(4.25rem)" }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          className={cn("fixed bottom-5 left-5 right-5 z-50", className)}
        >
          <ShoppingBag size={24} />
          Buy now for {formatEther(BigInt(token.price ?? "0"))} ETH
        </MotionButton>
      )}
    </AnimatePresence>
  );
}
