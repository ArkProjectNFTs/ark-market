import type { PropsWithClassName } from "@/lib/utils";

export default function EtherIcon({ className }: PropsWithClassName) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M9.63509 2.55961L4.98095 8.64837C4.65421 9.07582 4.63298 9.66299 4.928 10.1129L9.07871 16.4431C9.57915 17.2063 10.6979 17.2063 11.1983 16.4431L15.349 10.1129C15.6441 9.66299 15.6228 9.07582 15.2961 8.64837L10.642 2.55961C10.3883 2.22782 9.88871 2.22782 9.63509 2.55961Z"
        stroke="currentColor"
        strokeWidth="1.26733"
      />
      <path
        d="M5.06934 9.362L9.25076 11.5707C9.80631 11.8642 10.471 11.8642 11.0265 11.5707L15.208 9.362"
        stroke="currentColor"
        strokeWidth="1.26733"
      />
    </svg>
  );
}
