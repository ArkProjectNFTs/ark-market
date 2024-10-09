"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@ark-market/ui";

interface IconProps {
  icon: string;
  className?: string;
  weight?: number;
}

export type IconWeightProps = Pick<IconProps, "weight">;

const calculateFontWeight = (fontSize: number): number => {
  if (fontSize <= 16) {
    return 42;
  } else if (fontSize >= 24) {
    return 11;
  } else {
    const t = (fontSize - 16) / (24 - 16);
    return Math.round(34 + t * (11 - 42));
  }
};

export const Icon: React.FC<IconProps> = ({ icon, className, weight }) => {
  const [fontWeight, setFontWeight] = useState<number | undefined>(weight);
  const [iconSize, setIconSize] = useState<string>("1em");
  const [marginTop, setMarginTop] = useState<string>("0.15em");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const computedStyle = window.getComputedStyle(ref.current);
      const fontSize = parseFloat(computedStyle.fontSize);
      if (isNaN(fontSize)) {
        return;
      }

      const minSize = 14;
      const maxSize = 24;

      const clampedSize = Math.min(Math.max(fontSize, minSize), maxSize);
      if (weight === undefined) {
        const calculatedWeight = calculateFontWeight(clampedSize);
        setFontWeight(isNaN(calculatedWeight) ? 20 : calculatedWeight);
      }

      if (fontSize < minSize) {
        setIconSize(`${minSize / fontSize}em`);
      } else if (fontSize > maxSize) {
        setIconSize(`${maxSize / fontSize}em`);
      } else {
        setIconSize("1em");
      }

      if (clampedSize <= 16) {
        setMarginTop("0.1275em");
      } else if (clampedSize >= 24) {
        setMarginTop("0.1em");
      } else {
        setMarginTop("0.1em");
      }
    }
  }, []);

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-center justify-center", className)}
      style={{
        fontFamily: "UnframedIconFont",
        fontSize: iconSize,
        width: iconSize,
        height: iconSize,
        lineHeight: 1,
        fontWeight: fontWeight,
      }}
    >
      <span style={{ marginTop }}>{icon}</span>
    </span>
  );
};
