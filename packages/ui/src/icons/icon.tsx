"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@ark-market/ui";

interface IconProps {
  icon: string; // The character code or name for the icon
  className?: string;
}

const calculateFontWeight = (fontSize: number): number => {
  if (fontSize <= 16) {
    return 34;
  } else if (fontSize >= 24) {
    return 11;
  } else {
    const t = (fontSize - 16) / (24 - 16);
    return Math.round(34 + t * (11 - 34));
  }
};

export const Icon: React.FC<IconProps> = ({ icon, className }) => {
  const [fontWeight, setFontWeight] = useState(20);
  const [iconSize, setIconSize] = useState('1em');
  const [marginTop, setMarginTop] = useState('0.15em');
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const computedStyle = window.getComputedStyle(ref.current);
      const fontSize = parseFloat(computedStyle.fontSize);
      const minSize = 16;
      const maxSize = 24;

      const clampedSize = Math.min(Math.max(fontSize, minSize), maxSize);
      setFontWeight(calculateFontWeight(clampedSize));
      
      // Set icon size, ensuring it's between 16px and 24px
      if (fontSize < minSize) {
        setIconSize(`${minSize / fontSize}em`);
      } else if (fontSize > maxSize) {
        setIconSize(`${maxSize / fontSize}em`);
      } else {
        setIconSize('1em');
      }

      // Adjust marginTop based on the effective size
      if (clampedSize <= 16) {
        setMarginTop('0.1875em'); // 3px for 16px font size
      } else if (clampedSize >= 24) {
        setMarginTop('0.1em'); // 3px for 24px font size
      } else {
        setMarginTop('0.1em'); // 3px for 20px font size
      }
    }
  }, []);

  return (
    <span
      ref={ref}
      className={cn("inline-flex items-bottom justify-center", className)}
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