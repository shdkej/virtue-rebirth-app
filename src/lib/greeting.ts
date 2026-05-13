import type { ITone } from "./judge";

export interface IGreeting {
  hello: string;
  nudge: string;
}

/**
 * Time-of-day greeting. Pure function — accepts a Date and tone, returns
 * a hello label (아침/낮/저녁/밤) and a nudge line per copy-spec.
 *
 * Buckets:
 *   04-10 → 아침
 *   10-17 → 낮
 *   17-22 → 저녁
 *   22-04 → 밤
 */
export const getGreeting = (now: Date, tone: ITone = "soft"): IGreeting => {
  const h = now.getHours();
  let bucket: "아침" | "낮" | "저녁" | "밤";
  if (h >= 4 && h < 10) bucket = "아침";
  else if (h >= 10 && h < 17) bucket = "낮";
  else if (h >= 17 && h < 22) bucket = "저녁";
  else bucket = "밤";

  const POOL: Record<"아침" | "낮" | "저녁" | "밤", Record<ITone, string>> = {
    아침: {
      soft: "오늘 1덕만 쌓아볼까요?",
      casual: "오늘 1덕만 쌓아볼까.",
    },
    낮: {
      soft: "점심은 드셨어요? 1덕도 같이.",
      casual: "점심 먹었지? 1덕도 같이.",
    },
    저녁: {
      soft: "퇴근하셨어요? 가벼운 1덕 어떠세요?",
      casual: "퇴근했지? 가벼운 1덕 어때.",
    },
    밤: {
      soft: "오늘 하루, 한 덕 정도는 있었을 거예요.",
      casual: "오늘 하루, 한 덕 정도는 있었지.",
    },
  };

  return {
    hello: bucket,
    nudge: POOL[bucket][tone],
  };
};
