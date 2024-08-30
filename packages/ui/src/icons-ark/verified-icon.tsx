import type { PropsWithClassName } from "..";

export default function VerifiedIcon({ className }: PropsWithClassName) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 3C10.8 3 9.60002 3.6 9.00002 4.7C8.40123 4.54669 7.77305 4.55015 7.17597 4.71003C6.5789 4.86991 6.03305 5.18082 5.59098 5.61284C5.14892 6.04486 4.82554 6.58342 4.65197 7.17666C4.47841 7.7699 4.46052 8.39784 4.60002 9C3.60002 9.6 2.90002 10.8 2.90002 12C2.90002 13.2 3.60002 14.4 4.60002 15C4.30002 16.2 4.60002 17.5 5.60002 18.4C6.40002 19.2 7.70002 19.6 8.90002 19.4C9.50002 20.4 10.7 21 11.9 21C13.1 21 14.3 20.4 14.9 19.3C16.1 19.6 17.4 19.3 18.3 18.3C19.1 17.5 19.5 16.3 19.3 15C20.3 14.4 20.9 13.2 20.9 12C20.9 10.8 20.3 9.6 19.2 9C19.5 7.8 19.2 6.5 18.2 5.6C17.7725 5.17793 17.2486 4.86631 16.6736 4.69208C16.0987 4.51785 15.4899 4.48624 14.9 4.6C14.3 3.6 13.1 3 11.9 3H12Z"
        fill="#64748B"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
