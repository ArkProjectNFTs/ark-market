export default function ExploreCollectionCard() {
  return (
    <div className="relative h-full w-full rounded-lg border border-border">
      <ExploreCollectionCardBackground />
      <p className="relative z-10 aspect-video w-full px-7 py-5 text-7xl font-bold leading-[64px] tracking-[-4px]">
        Explore
        <br />
        Collections
      </p>
    </div>
  );
}

function ExploreCollectionCardBackground() {
  return (
    <svg
      width="468"
      height="348"
      viewBox="0 0 468 348"
      fill="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d="M-374.997 125.494L139.61 -213.53L605.712 221.186L473.73 308.137L-374.997 125.494Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.9"
        d="M-349.031 66.0335L187.283 -194.711L579.96 280.884L442.396 347.756L-349.031 66.0335Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.8"
        d="M-316.659 12.2165L230.645 -170.665L547.757 334.969L407.391 381.873L-316.659 12.2165Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.7"
        d="M-278.824 -35.3549L269.25 -142.143L510.064 382.807L369.495 410.189L-278.824 -35.3549Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.6"
        d="M-236.575 -76.2449L302.725 -109.924L467.903 423.962L329.575 432.601L-236.575 -76.2449Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.5"
        d="M-190.893 -110.189L330.799 -74.8342L422.285 458.181L288.483 449.117L-190.893 -110.189Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.4"
        d="M-142.819 -137.032L353.302 -37.6183L374.222 485.273L246.97 459.786L-142.819 -137.032Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.3"
        d="M-93.296 -156.742L370.266 0.897887L324.696 505.257L205.803 464.813L-93.296 -156.742Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.2"
        d="M-43.3379 -169.434L381.664 39.9919L274.674 518.2L165.664 464.483L-43.3379 -169.434Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.1"
        d="M6.2237 -175.358L387.736 78.9254L225.054 524.35L127.205 459.133L6.2237 -175.358Z"
        stroke="#848794"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
