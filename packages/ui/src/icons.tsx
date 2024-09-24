// Import all icons from lucide-react
import {
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
  Circle,
  FileSignature,
  Flame,
  HelpCircle,
  ListX,
  Loader2,
  LoaderCircle,
  ArrowLeft as LucideArrowLeft,
  ArrowLeftRight as LucideArrowLeftRight,
  ArrowRight as LucideArrowRight,
  BarChart3 as LucideChart,
  Check as LucideCheck,
  ChevronDown as LucideChevronDown,
  ChevronLeft as LucideChevronLeft,
  ChevronRight as LucideChevronRight,
  ChevronUp as LucideChevronUp,
  CircleDot as LucideCircleDot,
  Copy as LucideCopy,
  Filter as LucideFilter,
  Gavel as LucideGavel,
  Globe as LucideGlobe,
  Grid2X2 as LucideGrid2X2,
  Grid3X3 as LucideGrid3X3,
  List as LucideList,
  Moon as LucideMoon,
  PartyPopper as LucidePartyPopper,
  RefreshCw as LucideRefreshCw,
  Search as LucideSearch,
  Share2 as LucideShare2,
  ShoppingCart as LucideShoppingCart,
  Sun as LucideSun,
  Tag as LucideTag,
  TimerReset as LucideTimerReset,
  VerifiedIcon as LucideVerifiedIcon,
  Wallet as LucideWallet,
  Mail,
  Meh,
  MoreHorizontal,
  Power,
  ShoppingBag,
  Slash,
  User,
  X,
} from "lucide-react";

import type { PropsWithClassName } from ".";
import { Icon } from "./icon-wrapper";

// Updated exports
export {
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
  Circle,
  FileSignature,
  Flame,
  HelpCircle,
  ListX,
  Loader2,
  LoaderCircle,
  Mail,
  Meh,
  MoreHorizontal,
  Power,
  ShoppingBag,
  Slash,
  User,
  X,
};

export const Congratulations =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="3" />
      )
    : LucidePartyPopper;

export const CircleDot =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="k" />
      )
    : LucideCircleDot;

export const ActivityList =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="g" />
      )
    : LucideList;

export const ActivityDelist =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="h" />
      )
    : ListX;

export const ActivityOffer =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="i" />
      )
    : LucideTag;

export const ActivityCancelOffer =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="j" />
      )
    : X;

export const Tag =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="g" />
      )
    : LucideTag;

export const ChevronRight =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="I" />
      )
    : LucideChevronRight;

export const ChevronDown =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="J" />
      )
    : LucideChevronDown;

export const ChevronLeft =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="K" />
      )
    : LucideChevronLeft;

export const ChevronUp =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="L" />
      )
    : LucideChevronUp;

export const ArrowRight =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="M" />
      )
    : LucideArrowRight;

export const ArrowLeft =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="N" />
      )
    : LucideArrowLeft;

export const ArrowLeftRight =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="f" />
      )
    : LucideArrowLeftRight;

export const Moon =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="W" />
      )
    : LucideMoon;

export const Sun =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="V" />
      )
    : LucideSun;

export const ShoppingCart =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="e" />
      )
    : LucideShoppingCart;

export const Chart =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="r" />
      )
    : LucideChart;

export const RefreshCw =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="G" />
      )
    : LucideRefreshCw;

export const Gavel =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="l" />
      )
    : LucideGavel;

export const Share2 =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="v" />
      )
    : LucideShare2;

export const TimerReset =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="T" />
      )
    : LucideTimerReset;

// Conditional exports
export const Check =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="p" />
      )
    : LucideCheck;

export const Copy =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="F" />
      )
    : LucideCopy;

export const Search =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="D" />
      )
    : LucideSearch;

export const Discord =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="c" />
      )
    : ({ className }: PropsWithClassName) => (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 15 15"
          height="24px"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.71437 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584ZM11.0181 11.5382C11.0395 11.5713 11.0615 11.6051 11.0838 11.6392C11.2169 11.843 11.3487 12.0385 11.4508 12.1809C11.8475 12.0916 12.352 11.8818 12.8361 11.5917C13.3795 11.2661 13.8098 10.8918 14.0177 10.5739C13.9852 9.06758 13.7993 7.50369 13.4773 6.21648C13.38 5.82759 13.2038 5.27021 12.9903 4.74117C12.7893 4.24326 12.5753 3.82162 12.388 3.5792C11.7376 3.24219 10.7129 2.88582 10.0454 2.78987C10.0308 2.79839 10.0113 2.81102 9.98675 2.82955C9.91863 2.881 9.84018 2.95666 9.76111 3.04945C9.71959 3.09817 9.68166 3.1471 9.64768 3.19449C9.953 3.25031 10.2253 3.3171 10.4662 3.39123C11.1499 3.6016 11.6428 3.89039 11.884 4.212C12.0431 4.42408 12.0001 4.72494 11.788 4.884C11.5759 5.04306 11.2751 5.00008 11.116 4.788C11.0572 4.70961 10.8001 4.4984 10.1838 4.30877C9.58933 4.12585 8.71356 3.98 7.5 3.98C6.28644 3.98 5.41067 4.12585 4.81616 4.30877C4.19988 4.4984 3.94279 4.70961 3.884 4.788C3.72494 5.00008 3.42408 5.04306 3.212 4.884C2.99992 4.72494 2.95694 4.42408 3.116 4.212C3.35721 3.89039 3.85011 3.6016 4.53383 3.39123C4.77418 3.31727 5.04571 3.25062 5.35016 3.19488C5.31611 3.14738 5.27808 3.09831 5.23645 3.04945C5.15738 2.95666 5.07893 2.881 5.01081 2.82955C4.98628 2.81102 4.96674 2.79839 4.95217 2.78987C4.28464 2.88582 3.25999 3.24219 2.60954 3.5792C2.42226 3.82162 2.20825 4.24326 2.00729 4.74117C1.79376 5.27021 1.61752 5.82759 1.52025 6.21648C1.19829 7.50369 1.01236 9.06758 0.97986 10.5739C1.18772 10.8918 1.61807 11.2661 2.16148 11.5917C2.64557 11.8818 3.15003 12.0916 3.5468 12.1809C3.64885 12.0385 3.78065 11.843 3.9138 11.6392C3.93626 11.6048 3.95838 11.5708 3.97996 11.5375C3.19521 11.2591 2.77361 10.8758 2.50064 10.4664C2.35359 10.2458 2.4132 9.94778 2.63377 9.80074C2.85435 9.65369 3.15236 9.71329 3.29941 9.93387C3.56077 10.3259 4.24355 11.0201 7.50002 11.0201C10.7565 11.0201 11.4392 10.326 11.7006 9.93386C11.8477 9.71329 12.1457 9.65369 12.3663 9.80074C12.5869 9.94779 12.6465 10.2458 12.4994 10.4664C12.2262 10.8762 11.8041 11.2598 11.0181 11.5382ZM4.08049 7.01221C4.32412 6.74984 4.65476 6.60162 5.00007 6.59998C5.34538 6.60162 5.67603 6.74984 5.91966 7.01221C6.16329 7.27459 6.30007 7.62974 6.30007 7.99998C6.30007 8.37021 6.16329 8.72536 5.91966 8.98774C5.67603 9.25011 5.34538 9.39833 5.00007 9.39998C4.65476 9.39833 4.32412 9.25011 4.08049 8.98774C3.83685 8.72536 3.70007 8.37021 3.70007 7.99998C3.70007 7.62974 3.83685 7.27459 4.08049 7.01221ZM9.99885 6.59998C9.65354 6.60162 9.3229 6.74984 9.07926 7.01221C8.83563 7.27459 8.69885 7.62974 8.69885 7.99998C8.69885 8.37021 8.83563 8.72536 9.07926 8.98774C9.3229 9.25011 9.65354 9.39833 9.99885 9.39998C10.3442 9.39833 10.6748 9.25011 10.9184 8.98774C11.1621 8.72536 11.2989 8.37021 11.2989 7.99998C11.2989 7.62974 11.1621 7.27459 10.9184 7.01221C10.6748 6.74984 10.3442 6.60162 9.99885 6.59998Z"
            fill="currentColor"
          ></path>
        </svg>
      );

export const Ethereum =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="X" />
      )
    : ({ className }: PropsWithClassName) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <circle cx="16" cy="16" r="16" fill="white" />
          <path
            d="M15.9547 22.0532L9 17.9962L15.9539 27.6772L22.9135 17.9962L15.9523 22.0532H15.9547ZM16 5L9.08891 15.5L16 19.875L23 15.5037L16 5Z"
            fill="#64698C"
          />
          <path
            d="M9 17.9961L15.9547 22.0532L15.9539 27.6771L9 17.9961Z"
            fill="#8C93AF"
          />
          <path
            d="M16.0776 19.5857L9.12207 15.5249L15.9999 5L16.0776 19.5857Z"
            fill="#8C94AF"
          />
          <path
            d="M16.0776 19.5856L9.12207 15.5248L16.0776 12.4375L16.0776 19.5856Z"
            fill="#64688C"
          />
          <path
            d="M16.0006 19.875L22.9727 15.5248L16.0171 12.4375L16.0006 19.875Z"
            fill="#474A73"
          />
        </svg>
      );

export const Filter =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="E" />
      )
    : LucideFilter;

export const Grid2X2 =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="B" />
      )
    : LucideGrid2X2;

export const List =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="A" />
      )
    : LucideList;

export const Grid3X3 =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="C" />
      )
    : LucideGrid3X3;

export const Starknet =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="Y" />
      )
    : ({ className }: PropsWithClassName) => (
        <svg
          className={className}
          width="24"
          height="24"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            d="M17.9998 34.6245C8.81807 34.6245 1.375 27.1815 1.375 17.9998C1.375 8.81807 8.81807 1.375 17.9998 1.375C27.1814 1.375 34.625 8.81805 34.625 17.9998C34.625 27.1815 27.1814 34.6245 17.9998 34.6245Z"
            fill="#163349"
            stroke="#334155"
            strokeWidth="1.25"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.1929 15.5032L11.6804 13.3385C11.7795 13.0321 12.0213 12.7937 12.3287 12.6997L14.4971 12.2343C14.7066 12.1703 14.7083 11.8747 14.5005 11.8073L12.3389 11.3197C12.0331 11.2206 11.7948 10.9788 11.7002 10.6713L11.2353 8.49972C11.1713 8.29077 10.8757 8.2885 10.8084 8.49689L10.3208 10.6611C10.2217 10.9669 9.97995 11.2053 9.67248 11.2999L7.71226 11.8322C7.50275 11.8967 7.50049 12.1918 7.70887 12.2591L9.66229 12.6793C9.96806 12.7784 10.2064 13.0208 10.301 13.3283L10.7659 15.4998C10.8299 15.7093 11.1255 15.7115 11.1929 15.5032Z"
            fill="#FAFAFA"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.3237 13.5198C29.8182 12.9545 29.0292 12.6363 28.2622 12.5058C27.4891 12.3804 26.6785 12.3921 25.9152 12.5276C24.371 12.7889 22.968 13.4283 21.7444 14.2171C21.109 14.6043 20.5671 15.0523 20.0056 15.5085C19.7351 15.7392 19.4885 15.9849 19.2317 16.2271L18.5299 16.9254C17.7673 17.7225 17.0156 18.4485 16.2884 19.0503C15.5582 19.6493 14.8755 20.1043 14.2027 20.422C13.5304 20.7413 12.811 20.9291 11.8733 20.9592C10.9438 20.992 9.84417 20.8242 8.6679 20.5473C7.48531 20.2717 6.24348 19.8787 4.85576 19.5406C5.33997 20.8839 6.06913 22.071 7.00528 23.1562C7.95242 24.2225 9.13511 25.1944 10.6544 25.8335C12.1518 26.4869 14.0335 26.7214 15.793 26.3676C17.5571 26.028 19.1053 25.2117 20.3566 24.2676C21.6112 23.3138 22.6262 22.2274 23.4819 21.0979C23.7181 20.7859 23.843 20.6112 24.014 20.3673L24.4864 19.6675C24.8148 19.2346 25.1136 18.7417 25.4386 18.3128C26.0758 17.4145 26.7039 16.5173 27.4339 15.6907C27.8014 15.2714 28.1887 14.8704 28.6461 14.485C28.8742 14.2969 29.1207 14.1128 29.3936 13.9469C29.6707 13.7681 29.9633 13.6281 30.3237 13.5198Z"
            fill="url(#paint0_linear_1117_72106)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.3244 13.5206C29.7812 12.1503 28.7717 10.9968 27.4166 10.1456C26.0698 9.30376 24.1991 8.87414 22.3454 9.24037C21.4296 9.41747 20.5424 9.75845 19.7639 10.2125C18.9888 10.6648 18.2943 11.2093 17.693 11.7933C17.3929 12.0864 17.1204 12.392 16.8498 12.6994L16.1482 13.5938L15.0647 15.0336C13.6834 16.886 12.1959 19.057 9.75482 19.7002C7.35839 20.3317 6.31902 19.7725 4.85641 19.5414C5.12384 20.2319 5.45512 20.9024 5.90421 21.4923C6.34494 22.0941 6.86551 22.6594 7.51273 23.1439C7.8398 23.3766 8.18512 23.6063 8.56864 23.8011C8.95041 23.9892 9.36213 24.1549 9.80159 24.2796C10.6757 24.5192 11.6598 24.6031 12.6127 24.4743C13.566 24.3471 14.4772 24.0449 15.2736 23.6437C16.076 23.2463 16.7749 22.7622 17.399 22.2514C18.6396 21.2211 19.6046 20.0828 20.4198 18.9321C20.8298 18.3568 21.2019 17.7706 21.5461 17.1843L21.9513 16.4862C22.0751 16.2822 22.2004 16.0769 22.3276 15.8857C22.8409 15.1175 23.343 14.5015 23.9528 14.0392C24.5542 13.5649 25.3916 13.2145 26.5106 13.1331C27.625 13.0507 28.9114 13.2029 30.3244 13.5206Z"
            fill="#FAFAFA"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 25C24 26.1043 24.8959 27 26.0005 27C27.1052 27 28 26.1043 28 25C28 23.8957 27.1052 23 26.0005 23C24.8959 23 24 23.8957 24 25Z"
            fill="url(#paint1_linear_1117_72106)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1117_72106"
              x1="30.1874"
              y1="13.039"
              x2="-11.4333"
              y2="34.6935"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EC796B" />
              <stop offset="1" stopColor="#D672EF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1117_72106"
              x1="27.9986"
              y1="23.597"
              x2="20.7086"
              y2="24.2805"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EC796B" />
              <stop offset="1" stopColor="#D672EF" />
            </linearGradient>
          </defs>
        </svg>
      );

export const Telegram =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="U" />
      )
    : ({ className }: PropsWithClassName) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            d="M15.953 1.24303L13.5497 12.5992C13.3662 13.4064 12.8892 13.5899 12.2104 13.223L8.54123 10.5078L6.70662 12.214C6.62022 12.3268 6.50922 12.4186 6.38206 12.4821C6.25491 12.5457 6.11494 12.5795 5.97278 12.5809L6.22963 8.91167L13.0177 2.76575C13.3295 2.50891 13.0177 2.36214 12.5774 2.61898L4.24825 7.8476L0.579049 6.71014C-0.20983 6.47165 -0.228177 5.92127 0.744162 5.55435L14.889 0.0505369C15.5861 -0.151269 16.1732 0.252342 15.953 1.24303Z"
            fill="currentColor"
          />
        </svg>
      );

export const VerifiedIcon =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="U" />
      )
    : LucideVerifiedIcon;

export const Wallet =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="O" />
      )
    : LucideWallet;

export const Globe =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="b" />
      )
    : LucideGlobe;

export const XIcon =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <Icon className={className} icon="a" />
      )
    : ({ className }: PropsWithClassName) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          className={className}
        >
          <path
            d="M12.2169 1.26929H14.4659L9.55249 6.88495L15.3327 14.5266H10.8068L7.26204 9.89198L3.20598 14.5266H0.955637L6.21097 8.52002L0.666016 1.26929H5.30675L8.51095 5.50551L12.2169 1.26929ZM11.4276 13.1805H12.6737L4.62961 2.54471H3.29232L11.4276 13.1805Z"
            fill="currentColor"
          />
        </svg>
      );

export const NoOffer =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <svg
          className={`${className} text-black text-opacity-10 dark:text-white dark:text-opacity-10`}
          width="73"
          height="72"
          viewBox="0 0 73 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.3725 14.9355L0 55.6561L25.2366 50.0373L21.5442 44.4988L19.0442 30.4988L25.0442 28.9988L28.5442 37.9988V15.9988H28.5859L25.3725 14.9355ZM36.5442 18.6322V18.9988L44.6604 21.3177L36.5442 18.6322ZM50.5442 23.2646V44.4027L65.975 40.9672L72.4824 30.5238L50.5442 23.2646Z"
            className="fill-current"
          />
          <path
            d="M29.2116 40.1667L28.2533 41L24.1699 30.375L19.8783 31.8333L22.3783 46H21.0449L18.5033 31L24.8783 28.8333L29.2116 40.1667ZM21.0449 46L21.2949 44.1667L30.0866 56H28.5449L21.0449 46ZM51.0449 46.25V48.5L46.0449 56H44.5449L51.0449 46.25ZM43.8366 36H42.5866V21.5833L43.8366 21.9167V36ZM36.6699 36H35.4199V17.25H29.5033V41H28.2533V38.5V16H36.6699V18.7083L51.0449 23.5V48.5H49.7949V24.3333L36.6699 20V36Z"
            className="fill-black dark:fill-white"
          />
        </svg>
      )
    : Meh;

export const NoListing =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} text-black text-opacity-10 dark:text-white dark:text-opacity-10`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.9858 47.2754L16.1545 1.94189L33.9024 19.4998H33.7528L16.7528 35.4998L32.6248 51.3718L15.9858 47.2754ZM37.692 52.6193L61.5131 58.4839L61.5561 46.8573L52.2528 37.6537V38.4998L37.692 52.6193Z"
            className="fill-current"
          />
          <path
            d="M15.2524 36L32.7524 18.5L33.2941 19.75L17.0441 36L35.2524 54.2083L52.7524 36.7083V38.5L35.2524 56L15.2524 36ZM51.5024 19.75H32.7524V18.5H52.7524V38.5H51.5024V19.75ZM44.0024 29.75C43.308 29.75 42.7108 29.5139 42.2108 29.0417C41.7386 28.5417 41.5024 27.9444 41.5024 27.25C41.5024 26.5278 41.7386 25.9306 42.2108 25.4583C42.7108 24.9861 43.308 24.75 44.0024 24.75C44.7247 24.75 45.3219 24.9861 45.7941 25.4583C46.2663 25.9306 46.5024 26.5278 46.5024 27.25C46.5024 27.9444 46.2663 28.5417 45.7941 29.0417C45.3219 29.5139 44.7247 29.75 44.0024 29.75Z"
            className="fill-black dark:fill-white"
          />
        </svg>
      )
    : Meh;

export const NoResult =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <svg
          className={`${className} text-black text-opacity-10 dark:text-white dark:text-opacity-10`}
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.6797 46.9993C41.964 46.9993 48.6797 40.2836 48.6797 31.9993C48.6797 28.9871 47.7918 26.1823 46.2635 23.8322L61.5114 19.6167L71.5252 25.4136L39.297 59.1563L0.252441 36.5527L18.6894 31.4555C18.6829 31.636 18.6797 31.8173 18.6797 31.9993C18.6797 40.2836 25.3954 46.9993 33.6797 46.9993Z"
            className="fill-current"
          />
          <path
            d="M33.9292 48.5C30.9848 48.5 28.2625 47.7778 25.7625 46.3333C23.2903 44.8611 21.3181 42.8889 19.8459 40.4167C18.4014 37.9167 17.6792 35.1944 17.6792 32.25C17.6792 29.3056 18.4014 26.5972 19.8459 24.125C21.3181 21.625 23.2903 19.6528 25.7625 18.2083C28.2625 16.7361 30.9848 16 33.9292 16C36.8736 16 39.582 16.7361 42.0542 18.2083C44.5542 19.6528 46.5264 21.625 47.9709 24.125C49.4431 26.5972 50.1792 29.3056 50.1792 32.25C50.1792 35.1944 49.4431 37.9167 47.9709 40.4167C46.5264 42.8889 44.5542 44.8611 42.0542 46.3333C39.582 47.7778 36.8736 48.5 33.9292 48.5ZM33.9292 47.25C36.6514 47.25 39.1653 46.5833 41.4709 45.25C43.7764 43.9167 45.5959 42.0972 46.9292 39.7917C48.2625 37.4861 48.9292 34.9722 48.9292 32.25C48.9292 29.5278 48.2625 27.0139 46.9292 24.7083C45.5959 22.4028 43.7764 20.5833 41.4709 19.25C39.1653 17.9167 36.6514 17.25 33.9292 17.25C31.207 17.25 28.6931 17.9167 26.3875 19.25C24.082 20.5833 22.2625 22.4028 20.9292 24.7083C19.5959 27.0139 18.9292 29.5278 18.9292 32.25C18.9292 34.9722 19.5959 37.4861 20.9292 39.7917C22.2625 42.0972 24.082 43.9167 26.3875 45.25C28.6931 46.5833 31.207 47.25 33.9292 47.25ZM56.8042 56L44.4292 43.625L45.3042 42.75L57.6792 55.125L56.8042 56Z"
            className="fill-black dark:fill-white"
          />
        </svg>
      )
    : Meh;

export const NoActivity =
  process.env.NEXT_PUBLIC_THEME === "unframed"
    ? ({ className }: PropsWithClassName) => (
        <svg
          className={`${className} text-black text-opacity-10 dark:text-white dark:text-opacity-10`}
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M38.335 55.0017L71.825 47.8642L53.8936 35.9999H46.2524L38.335 55.0017ZM17.6798 36.3984L25.2524 35.9999L31.7238 21.3313L18.82 12.7935L7.50342 15.205L17.6798 36.3984Z"
            className="fill-current"
          />
          <path
            d="M15.6792 36.625V35.375H25.6792V36.625H15.6792ZM46.6375 36.375L38.2209 56L32.2625 18.875H33.1792L25.6792 36.625L24.6792 35.625L33.0959 16L39.0542 53.125H38.1375L45.6375 35.375L46.6375 36.375ZM55.6375 35.375V36.625H45.6375V35.375H55.6375Z"
            className="fill-black dark:fill-white"
          />
        </svg>
      )
    : Meh;
