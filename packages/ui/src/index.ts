import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type PropsWithClassName<P = unknown> = P & { className?: string };

export const focusableStyles =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
export const ellipsableStyles =
  "whitespace-nowrap text-ellipsis overflow-hidden";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, num: number): string {
  if (str.startsWith("0x0")) {
    str = str.substring(4);
  }

  if (str.length <= num) {
    return str;
  }

  return str.slice(0, num);
}

export function areAddressesEqual(
  addr1: string | undefined,
  addr2: string | undefined,
): boolean {
  if (!addr1 || !addr2) {
    return false;
  }

  const normalizeAddress = (address: string) => {
    address =
      address.startsWith("0x") || address.startsWith("0X")
        ? address.substring(2)
        : address;
    return address.padStart(64, "0").toLowerCase();
  };

  return normalizeAddress(addr1) === normalizeAddress(addr2);
}

export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function timeSinceShort(timestamp: number): string {
  const now = new Date().getTime();
  const secondsPast = Math.floor((now - timestamp * 1000) / 1000); // Convert timestamp to milliseconds

  if (secondsPast < 60) {
    return `${secondsPast}s ago`;
  }

  const minutesPast = Math.floor(secondsPast / 60);
  if (minutesPast < 60) {
    return `${minutesPast}m ago`;
  }

  const hoursPast = Math.floor(minutesPast / 60);
  if (hoursPast < 24) {
    return `${hoursPast}h ago`;
  }

  const daysPast = Math.floor(hoursPast / 24);
  return `${daysPast}d ago`;
}

export function timeSince(timestamp: number): string {
  const now = new Date().getTime();
  const secondsPast = Math.floor((now - timestamp * 1000) / 1000); // Convert timestamp to milliseconds

  if (secondsPast < 60) {
    return "a few seconds ago";
  }

  const minutesPast = Math.floor(secondsPast / 60);
  if (minutesPast < 60) {
    return `${minutesPast} minute${minutesPast > 1 ? "s" : ""} ago`;
  }

  const hoursPast = Math.floor(minutesPast / 60);
  if (hoursPast < 24) {
    return `${hoursPast} hour${hoursPast > 1 ? "s" : ""} ago`;
  }

  const daysPast = Math.floor(hoursPast / 24);
  return `${daysPast} day${daysPast > 1 ? "s" : ""} ago`;
}

export function getRoundedRemainingTime(endTime: number): string {
  const total = new Date(endTime * 1000).getTime() - new Date().getTime();
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return "Expired";
  }
}

const NumberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

export function formatNumber(value: number | bigint) {
  return NumberFormatter.format(value);
}

// TODO: use viem formatEther instead
export function formatUnits(value: bigint | number | string, decimals: number) {
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");

  // eslint-disable-next-line prefer-const
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals),
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${
    fraction ? `.${fraction}` : ""
  }`;
}
