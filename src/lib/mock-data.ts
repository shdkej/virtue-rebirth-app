export interface IDeed {
  id: string;
  createdAt: string;
  photoUrl?: string;
  memo?: string;
  score: number;
  comment: string;
  tags: string[];
}

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
    createdAt: "2026-05-12T19:05:00+09:00",
    memo: "이웃 택배 받아줌",
    score: 3,
    comment: "비도 안 왔는데 챙겨주셨군요. 이웃집 강아지도 안심.",
    tags: ["이웃", "수고"],
  },
  {
    id: "d-003",
    createdAt: "2026-05-11T22:40:00+09:00",
    memo: "분리수거 정리",
    score: 1,
    comment: "분리수거장에서 굴러다니던 캔을 줍줍. 작지만 또렷한 1덕.",
    tags: ["환경", "일상"],
  },
  {
    id: "d-004",
    createdAt: "2026-05-10T08:00:00+09:00",
    memo: "동료 커피 사줌",
    score: 2,
    comment: "월요일 아침의 카페인은 거의 인도주의입니다.",
    tags: ["배려", "동료"],
  },
  {
    id: "d-005",
    createdAt: "2026-05-09T13:25:00+09:00",
    memo: "길고양이 사료 보충",
    score: 4,
    comment: "길고양이 입장에서 보면 당신은 오늘의 영웅.",
    tags: ["동물", "꾸준함"],
  },
  {
    id: "d-006",
    createdAt: "2026-05-07T17:10:00+09:00",
    memo: "엄마한테 안부 전화",
    score: 3,
    comment: "전화 한 통이면 충분한데 그게 제일 어렵죠. 잘 했어요.",
    tags: ["가족", "마음"],
  },
];

export const MOCK_TOTAL_VIRTUE = 612;
export const MOCK_MONTH_TOTAL = 83;
export const MOCK_YESTERDAY_TOTAL = 4;
