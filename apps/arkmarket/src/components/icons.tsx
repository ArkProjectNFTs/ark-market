"use client";

import * as React from "react";
import { useState } from "react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import { env } from "~/env";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => {
    return (
      <div>
        {env.NEXT_PUBLIC_THEME === "unframed" ? (
          <UnframedLogo {...props} />
        ) : (
          <svg
            width="225"
            height="30"
            viewBox="0 0 225 30"
            fill="none"
            {...props}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.2918 26.573C24.624 25.9327 30.4591 18.0355 29.9726 11.5741C29.5478 6.13532 23.729 3.35184 16.1297 3.93194C7.1089 4.62891 -0.429185 9.76167 0.019011 15.7571C0.491241 21.7728 8.69243 27.1531 16.2918 26.573ZM16.2301 15.3191C16.4039 15.4587 16.522 15.4463 16.6007 15.4381C16.8369 15.4133 16.9583 15.2427 16.9337 15.0085C16.8354 14.0718 15.5154 11.9217 12.9568 12.1901C10.3051 12.4255 8.87431 14.4336 9.10977 16.6778C9.17529 17.3023 9.49463 17.8804 9.9473 17.8329C10.1048 17.8164 10.2717 17.7002 10.2905 17.501C10.527 15.5821 12.0732 14.743 13.5014 14.5931C14.2493 14.5147 15.3376 14.6611 16.2301 15.3191ZM20.3718 14.5887C20.2878 14.7357 20.1914 14.7655 20.0733 14.7779C19.8962 14.7965 19.7183 14.6179 19.6896 14.3446C19.4869 12.4127 20.8562 10.6709 22.9818 10.4479C25.1665 10.2186 26.9109 11.6732 27.13 13.7613C27.1648 14.093 27.1258 14.6693 26.7715 14.7065C26.6534 14.7189 26.5313 14.6922 26.4341 14.5248C25.4634 13.0483 24.0841 12.7984 22.8638 12.9265C21.7419 13.0442 20.9583 13.5407 20.3718 14.5887Z"
              fill="#64748B"
            />
            <path
              d="M41.7881 23.3058C37.0984 23.3058 33.9991 20.1658 33.9991 15.8635C33.9991 11.5612 37.0984 8.42118 41.7473 8.42118C46.0088 8.42118 48.6595 10.9495 49.0061 14.6197H45.2544C45.0097 12.54 43.5212 11.4389 41.7269 11.4389C39.7899 11.4389 37.8936 12.907 37.8936 15.8635C37.8936 18.7997 39.7899 20.2881 41.7677 20.2881C43.7047 20.2881 45.2136 19.1259 45.499 17.1073H49.2508C48.9042 20.9202 45.9476 23.3058 41.7881 23.3058ZM59.2927 23.3058C54.7049 23.3058 51.4222 20.1658 51.4222 15.8635C51.4222 11.5612 54.7049 8.42118 59.2927 8.42118C63.8804 8.42118 67.1632 11.5612 67.1632 15.8635C67.1632 20.1658 63.8804 23.3058 59.2927 23.3058ZM59.2927 20.1658C61.2705 20.1658 63.2687 18.7997 63.2687 15.8635C63.2687 12.907 61.2705 11.5612 59.2927 11.5612C57.3149 11.5612 55.3166 12.907 55.3166 15.8635C55.3166 18.7997 57.3149 20.1658 59.2927 20.1658ZM70.0003 23V8.74742H89.8193V23H86.2919V11.9079H81.6837V23H78.1563V11.9079H73.5481V23H70.0003ZM102.243 23.3058C100 23.3058 98.0425 22.0213 97.3493 19.3706H97.2473V26.0585H93.5363V8.74742H97.2473V12.3564H97.3493C98.0425 9.70575 100 8.42118 102.243 8.42118C105.587 8.42118 108.421 10.8272 108.421 15.8635C108.421 20.8998 105.587 23.3058 102.243 23.3058ZM97.2473 16.516C97.2473 18.7589 98.5115 20.1658 100.693 20.1658C102.651 20.1658 104.527 18.8201 104.527 15.8635C104.527 12.9274 102.651 11.5612 100.693 11.5612C98.5115 11.5612 97.2473 12.9681 97.2473 15.211V16.516ZM119.108 23V20.3289H119.006C118.353 22.3067 116.824 23.3262 114.663 23.3262C111.971 23.3262 109.626 21.7562 109.626 18.7181C109.626 16.0674 111.461 14.2935 115.58 14.2935H119.108V11.8875H111.196V8.74742H122.819V23H119.108ZM113.052 18.7385C113.052 20.0027 114.173 20.5736 115.723 20.5736C117.782 20.5736 119.108 19.7172 119.108 17.7394V17.0054H115.662C113.969 17.0054 113.052 17.5151 113.052 18.7385ZM126.531 23V8.74742H130.242V12.4788H130.344C131.037 9.70575 132.811 8.42118 134.972 8.42118C138.031 8.42118 140.396 10.3786 140.396 14.3954V23H136.685V15.211C136.685 13.0905 135.482 11.704 133.463 11.704C131.445 11.704 130.242 13.0905 130.242 15.211V23H126.531ZM147.923 22.0417L141.785 8.74742H146.088L149.656 17.8821H149.88L153.469 8.74742H157.751L151.634 22.0417V26.0585H147.923V22.0417ZM165.558 23V5.66854H169.269V23H165.558ZM180 23.3058C175.412 23.3058 172.129 20.1658 172.129 15.8635C172.129 11.5612 175.412 8.42118 180 8.42118C184.587 8.42118 187.87 11.5612 187.87 15.8635C187.87 20.1658 184.587 23.3058 180 23.3058ZM180 20.1658C181.977 20.1658 183.976 18.7997 183.976 15.8635C183.976 12.907 181.977 11.5612 180 11.5612C178.022 11.5612 176.024 12.907 176.024 15.8635C176.024 18.7997 178.022 20.1658 180 20.1658ZM190.73 26.0585V23.3262H199.09C199.579 23.3262 199.804 23.1019 199.804 22.6126V17.7802H199.702C199.049 19.7784 197.499 20.7775 195.318 20.7775C192.239 20.7775 189.751 18.6977 189.751 14.5993C189.751 10.501 192.239 8.42118 195.318 8.42118C197.499 8.42118 199.049 9.42029 199.702 11.4185H199.804V8.74742H203.514V22.5718C203.514 25.1002 202.373 26.0585 199.763 26.0585H190.73ZM193.279 14.5993C193.279 16.883 194.461 18.0452 196.562 18.0452C198.437 18.0452 199.804 17.1685 199.804 15.1906V14.008C199.804 12.0302 198.437 11.1534 196.562 11.1534C194.461 11.1534 193.279 12.2953 193.279 14.5993ZM214.248 23.3058C209.661 23.3058 206.378 20.1658 206.378 15.8635C206.378 11.5612 209.661 8.42118 214.248 8.42118C218.836 8.42118 222.119 11.5612 222.119 15.8635C222.119 20.1658 218.836 23.3058 214.248 23.3058ZM214.248 20.1658C216.226 20.1658 218.224 18.7997 218.224 15.8635C218.224 12.907 216.226 11.5612 214.248 11.5612C212.271 11.5612 210.272 12.907 210.272 15.8635C210.272 18.7997 212.271 20.1658 214.248 20.1658Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    );
  },
};

function UnframedLogo({ className }: PropsWithClassName) {
  const [active, setActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <p
      onMouseEnter={() => {
        setActive(true);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      onAnimationIteration={() => {
        if (!isHovering) {
          setActive(false);
        }
      }}
      className={cn(
        "font-[UnframedLogoFont] text-[26px]",
        active && "unframed-animate",
        className,
      )}
    >
      #Unframed
    </p>
  );
}
