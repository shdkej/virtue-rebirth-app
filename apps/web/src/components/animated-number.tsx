"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface IProps {
  value: number;
  duration?: number;
  className?: string;
}

export const AnimatedNumber = ({ value, duration = 700, className }: IProps) => {
  const [display, setDisplay] = useState<number>(value);
  const prevRef = useRef<number>(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) {
      setDisplay(to);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(to);
        prevRef.current = to;
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      prevRef.current = to;
    };
  }, [value, duration]);

  const rounded = Math.round(display);

  return <span className={cn("tabular-nums", className)}>{rounded.toLocaleString("ko-KR")}</span>;
};
