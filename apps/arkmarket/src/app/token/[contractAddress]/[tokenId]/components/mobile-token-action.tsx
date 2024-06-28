import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, formatUnits } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";

import type { TokenInfosApiResponse } from "../queries/getTokenData";

const MotionButton = motion(Button);

interface MobileTokenActionProps {
  show: boolean;
  tokenInfos: TokenInfosApiResponse["data"];
}

export default function MobileTokenAction({
  show,
  tokenInfos,
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
          Buy now for {formatUnits(BigInt(tokenInfos.price ?? "0"), 18)} ETH
        </MotionButton>
      )}
    </AnimatePresence>
  );
}
