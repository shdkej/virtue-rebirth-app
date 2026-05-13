export interface ISpecies {
  stage: number;
  name: string;
  emoji: string;
  min: number;
  max: number;
  blurb: string;
}

export const SPECIES: ISpecies[] = [
  { stage: 0, name: "돌", emoji: "🪨", min: 0, max: 49, blurb: "출발은 무생물부터." },
  { stage: 1, name: "송충이", emoji: "🐛", min: 50, max: 199, blurb: "꿈틀거리기 시작했어요." },
  { stage: 2, name: "달팽이", emoji: "🐌", min: 200, max: 499, blurb: "느리지만 어쨌든 동물." },
  { stage: 3, name: "고슴도치", emoji: "🦔", min: 500, max: 999, blurb: "이제 포유류!" },
  { stage: 4, name: "길고양이", emoji: "🐈", min: 1000, max: 1999, blurb: "이웃에 사랑받는 단계." },
  { stage: 5, name: "진돗개", emoji: "🐕", min: 2000, max: 3999, blurb: "충직하고 멋짐." },
  { stage: 6, name: "돌고래", emoji: "🐬", min: 4000, max: 6999, blurb: "지능 + 사회성." },
  { stage: 7, name: "코끼리", emoji: "🐘", min: 7000, max: 9999, blurb: "기억하고 슬퍼할 줄 안다." },
  { stage: 8, name: "인간(다시)", emoji: "🧑", min: 10000, max: 19999, blurb: "한 번 더 인간으로." },
  { stage: 9, name: "???", emoji: "✨", min: 20000, max: Number.MAX_SAFE_INTEGER, blurb: "?" },
];

export const getSpeciesFor = (total: number): { current: ISpecies; next: ISpecies | null; progress: number } => {
  const current = SPECIES.find((s) => total >= s.min && total <= s.max) ?? SPECIES[0];
  const next = SPECIES[current.stage + 1] ?? null;
  const span = current.max - current.min + 1;
  const progress = Math.min(1, Math.max(0, (total - current.min) / span));
  return { current, next, progress };
};
