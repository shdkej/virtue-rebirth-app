export interface ISpecies {
  stage: number;
  name: string;
  emoji: string;
  min: number;
  max: number;
  blurb: string;
  trait: string;
  evolutionLine: string;
  nextHint: string;
  bonusPerScore: number;
}

export const SPECIES: ISpecies[] = [
  {
    stage: 0,
    name: "돌",
    emoji: "🪨",
    min: 0,
    max: 49,
    blurb: "출발은 무생물부터.",
    trait: "출발선의 침묵 같은 존재.",
    evolutionLine: "처음엔 모두 돌이었어요. 일단 굴러가 봅시다.",
    nextHint: "뭔가 꿈틀거리는 것이 다가오는 중...",
    bonusPerScore: 1,
  },
  {
    stage: 1,
    name: "송충이",
    emoji: "🐛",
    min: 50,
    max: 199,
    blurb: "꿈틀거리기 시작했어요.",
    trait: "느리지만 분명한 움직임이 있는 존재.",
    evolutionLine: "드디어 꿈틀거리네요. 송충이 됐어요.",
    nextHint: "조금 더 단단한 껍데기를 가진 무언가가 보여요...",
    bonusPerScore: 1,
  },
  {
    stage: 2,
    name: "달팽이",
    emoji: "🐌",
    min: 200,
    max: 499,
    blurb: "느리지만 어쨌든 동물.",
    trait: "자기 집을 짊어진 느린 철학자.",
    evolutionLine: "껍데기까지 챙겨 다니는 단계. 달팽이로 진화.",
    nextHint: "가시 같은 게 살짝 보이는 작은 친구...",
    bonusPerScore: 1,
  },
  {
    stage: 3,
    name: "고슴도치",
    emoji: "🦔",
    min: 500,
    max: 999,
    blurb: "이제 포유류!",
    trait: "겉은 따끔, 속은 보들.",
    evolutionLine: "포유류 진입! 가시도 생겼네요.",
    nextHint: "골목 어귀에 익숙한 그림자가...",
    bonusPerScore: 1,
  },
  {
    stage: 4,
    name: "길고양이",
    emoji: "🐈",
    min: 1000,
    max: 1999,
    blurb: "이웃에 사랑받는 단계.",
    trait: "동네 골목의 주민등록 없는 시민.",
    evolutionLine: "야옹. 길고양이 단계 도착.",
    nextHint: "꼬리 흔드는 소리가 점점 가까워져요...",
    bonusPerScore: 1,
  },
  {
    stage: 5,
    name: "진돗개",
    emoji: "🐕",
    min: 2000,
    max: 3999,
    blurb: "충직하고 멋짐.",
    trait: "한 번 정하면 안 바꾸는 의리파.",
    evolutionLine: "충직함의 상징, 진돗개 단계.",
    nextHint: "파도 사이로 빛나는 등이 보여요...",
    bonusPerScore: 1,
  },
  {
    stage: 6,
    name: "돌고래",
    emoji: "🐬",
    min: 4000,
    max: 6999,
    blurb: "지능 + 사회성.",
    trait: "물 위의 똑똑한 사회인.",
    evolutionLine: "바다로 나갔습니다. 돌고래 단계.",
    nextHint: "묵직한 발소리가 멀리서 다가오는 듯...",
    bonusPerScore: 1,
  },
  {
    stage: 7,
    name: "코끼리",
    emoji: "🐘",
    min: 7000,
    max: 9999,
    blurb: "기억하고 슬퍼할 줄 안다.",
    trait: "거대한 몸에 깊은 기억을 담은 존재.",
    evolutionLine: "기억과 슬픔을 아는 코끼리 단계.",
    nextHint: "거울 속의 익숙한 얼굴이 어른거려요...",
    bonusPerScore: 1,
  },
  {
    stage: 8,
    name: "인간(다시)",
    emoji: "🧑",
    min: 10000,
    max: 19999,
    blurb: "한 번 더 인간으로.",
    trait: "두 번째 기회를 받은 사람.",
    evolutionLine: "환생 성공. 다시 인간입니다.",
    nextHint: "이 너머는... 잘 안 보입니다.",
    bonusPerScore: 1,
  },
  {
    stage: 9,
    name: "???",
    emoji: "✨",
    min: 20000,
    max: 49999,
    blurb: "?",
    trait: "이름도, 형체도 아직 정해지지 않은 무언가.",
    evolutionLine: "어... 이게 뭘까요. 형용할 수 없는 단계.",
    nextHint: "더 위가 있다고 합니다. 누가 봤대요.",
    bonusPerScore: 1,
  },
  {
    stage: 10,
    name: "천계의 무언가",
    emoji: "🌌",
    min: 50000,
    max: Number.MAX_SAFE_INTEGER,
    blurb: "이미 이 세계의 분류표 밖.",
    trait: "별과 별 사이를 떠다니는 잔잔한 빛.",
    evolutionLine: "축하합니다. 분류표를 벗어나셨어요.",
    nextHint: "다음은 없습니다. 여기가 끝이에요.",
    bonusPerScore: 1,
  },
];

export const getSpeciesFor = (
  total: number,
): { current: ISpecies; next: ISpecies | null; progress: number } => {
  const current = SPECIES.find((s) => total >= s.min && total <= s.max) ?? SPECIES[0];
  const next = SPECIES[current.stage + 1] ?? null;
  const span = current.max - current.min + 1;
  const progress = Math.min(1, Math.max(0, (total - current.min) / span));
  return { current, next, progress };
};

/**
 * If `totalAfter` crosses into a higher stage than `totalBefore` was in,
 * returns the newly unlocked stage. Else null.
 */
export const getRecentlyUnlocked = (totalBefore: number, totalAfter: number): ISpecies | null => {
  if (totalAfter <= totalBefore) return null;
  const before = getSpeciesFor(totalBefore).current;
  const after = getSpeciesFor(totalAfter).current;
  if (after.stage > before.stage) return after;
  return null;
};
