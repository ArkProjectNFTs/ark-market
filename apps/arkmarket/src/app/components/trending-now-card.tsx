export default function TrendingNowCard() {
  return (
    <div className="relative h-full w-full rounded-lg border border-border p-5">
      <TrendingNowCardBackground />
      <p className="relative z-10 text-7xl font-bold leading-[64px] tracking-[-4px]">
        Trending
        <br />
        Now
      </p>
    </div>
  );
}

function TrendingNowCardBackground() {
  return (
    <svg
      width="467"
      height="256"
      viewBox="0 0 467 256"
      fill="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d="M-301.964 -499.583L-43.3526 296.279L819.601 230.124L753.28 25.995L-301.964 -499.583Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.9"
        d="M-299.817 -425.939L14.8363 296.634L817.769 156.343L737.079 -28.9772L-299.817 -425.939Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.8"
        d="M-291.096 -357.146L69.3883 291.687L809.336 87.334L716.894 -79.0869L-291.096 -357.146Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.7"
        d="M-276.709 -293.4L120.071 282.087L795.179 23.4143L693.433 -124.203L-276.709 -293.4Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.6"
        d="M-257.398 -234.979L166.762 268.499L776.139 -35.2442L667.342 -164.366L-257.398 -234.979Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.5"
        d="M-234.037 -181.929L209.246 251.542L752.936 -88.4899L639.223 -199.658L-234.037 -181.929Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.4"
        d="M-207.276 -134.329L247.583 231.754L726.341 -136.288L609.677 -230.178L-207.276 -134.329Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.3"
        d="M-177.886 -92.1621L281.689 209.742L697.087 -178.681L579.213 -256.108L-177.886 -92.1621Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.2"
        d="M-146.556 -55.2758L311.672 186.051L665.846 -215.789L548.304 -277.677L-146.556 -55.2758Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.1"
        d="M-113.805 -23.5457L337.61 161.085L633.151 -247.72L517.359 -295.076L-113.805 -23.5457Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
