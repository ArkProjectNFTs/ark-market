export default function LiveAuctionsCard() {
  return (
    <div className="relative h-full w-full rounded-lg border border-border p-5">
      <LiveAuctionsCardBackground />
      <p className="relative z-10 text-5xl font-bold leading-[64px] tracking-[-4px] sm:text-6xl">
        Live
        <br />
        Auctions
      </p>
    </div>
  );
}

function LiveAuctionsCardBackground() {
  return (
    <svg
      width="344"
      height="409"
      viewBox="0 0 344 409"
      fill="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        opacity="0.1"
        d="M649.703 -344.512L419.471 437.528L-422.678 396.534L-363.635 195.95L649.703 -344.512Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.2"
        d="M649.612 -272.738L362.816 439.454L-422.897 324.635L-349.351 141.978L649.612 -272.738Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.3"
        d="M642.986 -205.51L309.558 436.117L-416.559 257.205L-331.056 92.6331L642.986 -205.51Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.4"
        d="M630.705 -143.042L259.94 428.145L-404.51 194.575L-309.436 48.0617L630.705 -143.042Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.5"
        d="M613.487 -85.6272L214.104 416.18L-387.56 136.936L-285.117 8.24221L613.487 -85.6272Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.6"
        d="M592.177 -33.3333L172.272 400.82L-366.411 84.4541L-258.694 -26.8892L592.177 -33.3333Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.7"
        d="M567.412 13.7464L134.404 382.591L-341.808 37.1862L-230.748 -57.4126L567.412 13.7464Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.8"
        d="M539.935 55.6081L100.593 362.083L-314.472 -4.89008L-201.787 -83.4898L539.935 55.6081Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.9"
        d="M510.426 92.378L70.7518 339.825L-285.056 -41.875L-172.273 -105.334L510.426 92.378Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        d="M479.394 124.166L44.8144 316.217L-254.085 -73.8577L-142.612 -123.117L479.394 124.166Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
