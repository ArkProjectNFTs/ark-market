import type { PropsWithClassName } from "..";

export function CheckIcon({ className }: PropsWithClassName) {
  return (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      className={className}
    >
      <path
        d="M1.125 3L3.125 5L7.125 1"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
