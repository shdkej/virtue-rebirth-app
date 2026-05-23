export interface IDeed {
  id: string;
  createdAt: string;
  photoUrl?: string;
  memo?: string;
  score: number;
  comment: string;
  tags: string[];
}

// NOTE: dates are anchored to 2026-05-13 (the app's "today") so the seed feels
// fresh. The store appends user deeds on top of these.
export const MOCK_DEEDS: IDeed[] = [
  {
    id: "d-001",
    createdAt: "2026-05-13T09:12:00+09:00",
    memo: "지하철에서 자리 양보",
    score: 2,
    comment: "조용히 자리를 비켜준 것 같네요. 무릎이 고마워했을 거예요.",
    tags: ["배려", "일상"],
  },
  {
    id: "d-002",
    createdAt: "2026-05-13T07:40:00+09:00",
    memo: "아침에 분리수거 마무리",
    score: 1,
    comment: "캔 한 줄 더 챙겨주셨네요. 1덕.",
    tags: ["환경", "일상"],
  },
  {
    id: "d-003",
    createdAt: "2026-05-12T19:05:00+09:00",
    memo: "이웃 택배 받아줌",
    score: 3,
    comment: "비도 안 왔는데 챙겨주셨군요. 이웃집 강아지도 안심.",
    tags: ["이웃", "수고"],
  },
  {
    id: "d-004",
    createdAt: "2026-05-12T12:30:00+09:00",
    memo: "동료 점심 대신 결제",
    score: 2,
    comment: "지갑 두고 온 동료의 영웅이 되셨군요.",
    tags: ["동료", "배려"],
  },
  {
    id: "d-005",
    createdAt: "2026-05-11T22:40:00+09:00",
    memo: "분리수거장 캔 줍줍",
    score: 1,
    comment: "분리수거장에서 굴러다니던 캔을 줍줍. 작지만 또렷한 1덕.",
    tags: ["환경", "일상"],
  },
  {
    id: "d-006",
    createdAt: "2026-05-10T08:00:00+09:00",
    memo: "동료 커피 사줌",
    score: 2,
    comment: "월요일 아침의 카페인은 거의 인도주의입니다.",
    tags: ["배려", "동료"],
  },
  {
    id: "d-007",
    createdAt: "2026-05-09T13:25:00+09:00",
    memo: "길고양이 사료 보충",
    score: 4,
    comment: "길고양이 입장에서 보면 당신은 오늘의 영웅.",
    tags: ["동물", "꾸준함"],
  },
  {
    id: "d-008",
    createdAt: "2026-05-08T20:10:00+09:00",
    memo: "쓰레기봉투 들어드림",
    score: 2,
    comment: "할머니 봉투 한쪽을 함께 들었어요. 무게가 반으로.",
    tags: ["이웃", "수고"],
  },
  {
    id: "d-009",
    createdAt: "2026-05-07T17:10:00+09:00",
    memo: "엄마한테 안부 전화",
    score: 3,
    comment: "전화 한 통이면 충분한데 그게 제일 어렵죠. 잘 했어요.",
    tags: ["가족", "마음"],
  },
  {
    id: "d-010",
    createdAt: "2026-05-05T11:00:00+09:00",
    memo: "공원 쓰레기 한 봉지 줍기",
    score: 4,
    comment: "공원 한 바퀴치 쓰레기를 거둬가셨군요. 4덕.",
    tags: ["환경", "꾸준함"],
  },
  {
    id: "d-011",
    createdAt: "2026-05-02T15:30:00+09:00",
    memo: "강아지 산책 도와줌",
    score: 2,
    comment: "옆집 강아지 산책 대타. 꼬리가 신나 보였어요.",
    tags: ["동물", "이웃"],
  },
  {
    id: "d-012",
    createdAt: "2026-04-28T09:45:00+09:00",
    memo: "회의록 정리해서 공유",
    score: 1,
    comment: "팀의 기억을 대신 적어주셨군요. 1덕.",
    tags: ["동료", "수고"],
  },
  {
    id: "d-013",
    createdAt: "2026-04-25T18:00:00+09:00",
    memo: "지나가던 어르신께 길 안내",
    score: 2,
    comment: "지도 한 번 켜는 데 30초. 그 30초가 누군가의 30분이에요.",
    tags: ["이웃", "배려"],
  },
  {
    id: "d-014",
    createdAt: "2026-04-20T21:00:00+09:00",
    memo: "그냥 사진 찍어봄",
    score: 0,
    comment: "음, 이건 그냥 사진인 것 같은데요. 다음 기회에.",
    tags: ["판정불가"],
  },
];

/**
 * Starting virtue, representing history before the tracked deeds.
 * The store derives total = INITIAL_VIRTUE + sum of stored deeds' scores.
 */
export const INITIAL_VIRTUE = 612;

/** Daily cap on virtue score earnings. */
export const DAILY_CAP = 30;

// ---------- Back-compat constant exports (page.tsx may still use these) -----
export const MOCK_TOTAL_VIRTUE = INITIAL_VIRTUE + MOCK_DEEDS.reduce((s, d) => s + d.score, 0);

const _today = new Date("2026-05-13T18:00:00+09:00");
const _isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const _yesterday = new Date(_today);
_yesterday.setDate(_today.getDate() - 1);

export const MOCK_YESTERDAY_TOTAL = MOCK_DEEDS.filter((d) =>
  _isSameDay(new Date(d.createdAt), _yesterday),
).reduce((s, d) => s + d.score, 0);

export const MOCK_MONTH_TOTAL = MOCK_DEEDS.filter((d) => {
  const dt = new Date(d.createdAt);
  return dt.getFullYear() === _today.getFullYear() && dt.getMonth() === _today.getMonth();
}).reduce((s, d) => s + d.score, 0);

// ---------- Helpers (preferred over the constants once page is updated) -----

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const computeTodayTotal = (deeds: IDeed[], now: Date = new Date()): number =>
  deeds.filter((d) => sameDay(new Date(d.createdAt), now)).reduce((s, d) => s + d.score, 0);

export const computeYesterdayTotal = (deeds: IDeed[], now: Date = new Date()): number => {
  const y = new Date(now);
  y.setDate(now.getDate() - 1);
  return deeds.filter((d) => sameDay(new Date(d.createdAt), y)).reduce((s, d) => s + d.score, 0);
};

export const computeMonthTotal = (deeds: IDeed[], now: Date = new Date()): number =>
  deeds
    .filter((d) => {
      const dt = new Date(d.createdAt);
      return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth();
    })
    .reduce((s, d) => s + d.score, 0);
