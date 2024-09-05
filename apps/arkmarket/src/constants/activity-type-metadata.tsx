import {
  ActivityCancelOffer,
  ActivityDelist,
  ActivityList,
  ActivityOffer,
  ArrowLeftRight,
  CircleDot,
  Flame,
  Gavel,
  ShoppingCart,
  TimerReset,
} from "@ark-market/ui/icons";

export default {
  AUCTION: { icon: <Gavel size={16} />, title: "Put in auction" },
  BURN: { icon: <Flame size={16} />, title: "Burn" },
  CANCEL_AUCTION: { icon: <Gavel size={16} />, title: "Cancel auction" },
  CANCEL_OFFER: {
    icon: <ActivityCancelOffer size={16} />,
    title: "Cancel Offer",
  },
  CANCELLED: { icon: <ActivityCancelOffer size={16} />, title: "Cancel Offer" },
  DELISTING: { icon: <ActivityDelist size={16} />, title: "Delist" },
  EXECUTED: { icon: <ShoppingCart size={16} />, title: "Sale" },
  EXPIRED_OFFER: { icon: <TimerReset size={16} />, title: "Expired Offer" },
  FULFILL: { icon: <ShoppingCart size={16} />, title: "Sale in progress" },
  LISTING: { icon: <ActivityList size={16} />, title: "List" },
  MINT: { icon: <CircleDot size={16} />, title: "Mint" },
  OFFER: { icon: <ActivityOffer size={16} />, title: "Offer" },
  SALE: { icon: <ShoppingCart size={16} />, title: "Sale" },
  TRANSFER: { icon: <ArrowLeftRight size={16} />, title: "Transfer" },
};
