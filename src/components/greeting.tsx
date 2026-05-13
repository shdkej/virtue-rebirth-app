"use client";

import { useEffect, useState } from "react";
import { getGreeting } from "@/lib/greeting";
import { useTone } from "@/lib/store";

const FALLBACK = "오늘 1덕만 쌓아볼까요?";

interface IProps {
  className?: string;
}

export const Greeting = ({ className }: IProps) => {
  const [tone] = useTone();
  const [line, setLine] = useState<string>(FALLBACK);

  useEffect(() => {
    setLine(getGreeting(new Date(), tone).nudge);
  }, [tone]);

  return <h1 className={className}>{line}</h1>;
};
