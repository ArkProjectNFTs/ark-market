import type { PropsWithClassName } from "..";

export default function XIcon({ className }: PropsWithClassName) {
  return (
    <svg
      width="16"
      height="16"
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
}
