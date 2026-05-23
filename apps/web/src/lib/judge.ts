export interface IJudgeResult {
  score: number;
  comment: string;
  tags: string[];
}

export type ITone = "soft" | "casual";

type IPoolKey = "배려" | "이웃" | "환경" | "동물" | "가족" | "동료" | "generic";

// Keyword routing — order matters: first match wins.
const KEYWORD_MAP: { key: IPoolKey; words: string[] }[] = [
  { key: "배려", words: ["양보", "자리", "배려"] },
  { key: "이웃", words: ["이웃", "택배", "도와", "도움"] },
  { key: "환경", words: ["분리수거", "줍", "쓰레기", "재활용"] },
  { key: "동물", words: ["고양이", "강아지", "동물", "사료"] },
  { key: "가족", words: ["엄마", "아빠", "부모", "가족", "전화", "안부"] },
  { key: "동료", words: ["커피", "동료", "팀", "회의"] },
];

export const COMMENTS: Record<IPoolKey, Record<ITone, IJudgeResult[]>> = {
  배려: {
    soft: [
      { score: 2, comment: "조용히 자리를 비켜준 것 같네요. 무릎이 고마워했을 거예요.", tags: ["배려", "일상"] },
      { score: 3, comment: "한 번 굽힌 무릎, 누군가에겐 하루치 위안이에요.", tags: ["배려", "마음"] },
      { score: 1, comment: "흠... 살짝 머뭇거린 흔적이 있지만, 결국 양보하셨네요. 1덕.", tags: ["배려", "애매"] },
      { score: 4, comment: "이쯤 되면 거의 양보 장인. 다음 칸도 비켜주실 기세.", tags: ["배려", "꾸준함"] },
      { score: 0, comment: "음, 자리 옆에 서계신 사진 같은데요. 일단 0덕.", tags: ["판정불가"] },
      { score: 5, comment: "지나치게 양보하셨습니다. 5덕 드릴 테니 좀 앉으세요.", tags: ["과잉친절"] },
    ],
    casual: [
      { score: 2, comment: "오, 자리 비켜줬네. 무릎이 좋아함.", tags: ["배려", "일상"] },
      { score: 3, comment: "양보 한 번에 누군가 하루가 좀 덜 빡셈. 3덕.", tags: ["배려", "마음"] },
      { score: 1, comment: "긴가민가하지만 마음은 받음. 1덕.", tags: ["배려", "애매"] },
      { score: 4, comment: "양보 장인 등장. 4덕.", tags: ["배려", "꾸준함"] },
      { score: 5, comment: "너무 친절해서 무서움. 5덕 줄 테니 좀 쉬셈.", tags: ["과잉친절"] },
    ],
  },
  이웃: {
    soft: [
      { score: 3, comment: "비도 안 왔는데 챙겨주셨군요. 이웃집 강아지도 안심.", tags: ["이웃", "수고"] },
      { score: 2, comment: "택배 한 박스의 무게만큼의 친절이에요.", tags: ["이웃", "일상"] },
      { score: 4, comment: "이웃 도움 + 시간 들임 = 보기 드문 콤보. 4덕.", tags: ["이웃", "꾸준함"] },
      { score: 1, comment: "지나가다 슬쩍 도와주신 정도지만, 마음은 1덕.", tags: ["이웃", "애매"] },
      { score: 0, comment: "음, 도와드린 건지 구경하신 건지 사진만으로는 애매해요.", tags: ["판정불가"] },
    ],
    casual: [
      { score: 3, comment: "이웃 택배 받아줌. 강아지도 안심함. 3덕.", tags: ["이웃", "수고"] },
      { score: 2, comment: "택배 무게만큼의 친절. 2덕.", tags: ["이웃", "일상"] },
      { score: 4, comment: "이웃 + 시간 = 콤보. 4덕.", tags: ["이웃", "꾸준함"] },
      { score: 1, comment: "스치듯 도와줌. 1덕.", tags: ["이웃", "애매"] },
    ],
  },
  환경: {
    soft: [
      { score: 1, comment: "분리수거장에서 굴러다니던 캔을 줍줍. 작지만 또렷한 1덕.", tags: ["환경", "일상"] },
      { score: 2, comment: "남이 안 치운 걸 치우는 건 거의 도시의 면역체계입니다.", tags: ["환경", "수고"] },
      { score: 3, comment: "쓰레기 한 봉지의 무게가 지구한테는 좀 가벼워졌어요.", tags: ["환경", "마음"] },
      { score: 4, comment: "이 정도면 동네 환경부 장관. 4덕.", tags: ["환경", "꾸준함"] },
      { score: 0, comment: "음, 쓰레기 옆에 서계신 사진인데요. 일단 0덕.", tags: ["판정불가"] },
    ],
    casual: [
      { score: 1, comment: "캔 하나 줍줍. 1덕.", tags: ["환경", "일상"] },
      { score: 2, comment: "남이 안 치운 거 치움. 도시 면역체계. 2덕.", tags: ["환경", "수고"] },
      { score: 3, comment: "지구가 좀 가벼워짐. 3덕.", tags: ["환경", "마음"] },
      { score: 5, comment: "분리수거 마스터. 5덕.", tags: ["환경", "과잉친절"] },
    ],
  },
  동물: {
    soft: [
      { score: 4, comment: "길고양이 입장에서 보면 당신은 오늘의 영웅.", tags: ["동물", "꾸준함"] },
      { score: 3, comment: "사료 한 컵의 무게가 그 친구 하루치예요.", tags: ["동물", "마음"] },
      { score: 2, comment: "쓰다듬은 자국이 보입니다. 따뜻한 손이었던 듯.", tags: ["동물", "일상"] },
      { score: 5, comment: "사료에 물에 담요까지. 거의 호텔 운영. 5덕.", tags: ["동물", "과잉친절"] },
      { score: 0, comment: "음, 고양이 사진은 예쁜데 선행 단서가 안 보여요. 0덕.", tags: ["판정불가"] },
    ],
    casual: [
      { score: 4, comment: "고양이한텐 오늘의 영웅. 4덕.", tags: ["동물", "꾸준함"] },
      { score: 3, comment: "사료 한 컵 = 하루치. 3덕.", tags: ["동물", "마음"] },
      { score: 2, comment: "쓰담쓰담 자국 있음. 2덕.", tags: ["동물", "일상"] },
      { score: 1, comment: "잠깐 본 정도. 1덕.", tags: ["동물", "애매"] },
    ],
  },
  가족: {
    soft: [
      { score: 3, comment: "전화 한 통이면 충분한데 그게 제일 어렵죠. 잘 했어요.", tags: ["가족", "마음"] },
      { score: 2, comment: "안부 한 마디가 일주일치 약입니다.", tags: ["가족", "일상"] },
      { score: 4, comment: "주기적으로 챙기시는군요. 효자/효녀 라인 진입.", tags: ["가족", "꾸준함"] },
      { score: 1, comment: "짧은 통화였지만 안 한 것보단 1덕.", tags: ["가족", "애매"] },
      { score: 5, comment: "이렇게까지 안 해도 되는데... 5덕 드릴게요. 좀 쉬세요.", tags: ["가족", "과잉친절"] },
    ],
    casual: [
      { score: 3, comment: "전화 한 통. 제일 어려운 거 함. 3덕.", tags: ["가족", "마음"] },
      { score: 2, comment: "안부 한 마디 = 일주일 약. 2덕.", tags: ["가족", "일상"] },
      { score: 4, comment: "효자/효녀 라인. 4덕.", tags: ["가족", "꾸준함"] },
      { score: 1, comment: "짧게 통화함. 1덕.", tags: ["가족", "애매"] },
    ],
  },
  동료: {
    soft: [
      { score: 2, comment: "월요일 아침의 카페인은 거의 인도주의입니다.", tags: ["동료", "배려"] },
      { score: 3, comment: "회의 끝에 커피 한 잔, 팀 분위기가 1도쯤 올라갔어요.", tags: ["동료", "마음"] },
      { score: 1, comment: "한 모금 나눠드린 정도지만, 마음은 1덕.", tags: ["동료", "애매"] },
      { score: 4, comment: "팀 전체 커피 + 회의 정리까지. 4덕.", tags: ["동료", "수고"] },
      { score: 0, comment: "음, 본인 커피 사진 같은데요. 0덕.", tags: ["판정불가"] },
    ],
    casual: [
      { score: 2, comment: "월요일 카페인 = 인도주의. 2덕.", tags: ["동료", "배려"] },
      { score: 3, comment: "팀 분위기 1도 올림. 3덕.", tags: ["동료", "마음"] },
      { score: 1, comment: "한 모금 나눠줌. 1덕.", tags: ["동료", "애매"] },
      { score: 5, comment: "팀 전원 커피 + 간식. 5덕.", tags: ["동료", "과잉친절"] },
    ],
  },
  generic: {
    soft: [
      { score: 2, comment: "사진 속 장면은 작지만 또렷한 친절이네요.", tags: ["일상", "마음"] },
      { score: 3, comment: "딱히 영웅적이진 않지만 누군가의 하루를 조금 덜 피곤하게 만들었어요.", tags: ["수고", "마음"] },
      { score: 1, comment: "흠... 살짝 애매하지만 일단 마음은 받았어요. 1덕.", tags: ["애매", "일상"] },
      { score: 4, comment: "오늘 같은 날 이런 일을 했다면 다음 생에 길고양이는 면할지도.", tags: ["꾸준함", "마음"] },
      { score: 0, comment: "음, 이건 그냥 사진인 것 같은데요. 다음 기회에.", tags: ["판정불가"] },
      { score: 5, comment: "지나치게 친절합니다. 5덕 드릴 테니 좀 쉬세요.", tags: ["과잉친절"] },
      { score: 2, comment: "스쳐 지나간 친절 같은데, 그래도 흔적은 남았어요.", tags: ["일상", "배려"] },
      { score: 3, comment: "이 정도면 평균의 윗줄. 3덕.", tags: ["꾸준함", "일상"] },
    ],
    casual: [
      { score: 2, comment: "작지만 또렷한 친절. 2덕.", tags: ["일상", "마음"] },
      { score: 3, comment: "누군가 하루가 좀 덜 빡셈. 3덕.", tags: ["수고", "마음"] },
      { score: 1, comment: "애매하지만 마음은 받음. 1덕.", tags: ["애매", "일상"] },
      { score: 4, comment: "이 정도면 다음 생 길냥이 면제 각. 4덕.", tags: ["꾸준함", "마음"] },
      { score: 0, comment: "음, 그냥 사진 같은데. 0덕.", tags: ["판정불가"] },
      { score: 5, comment: "너무 친절해서 무서움. 5덕.", tags: ["과잉친절"] },
    ],
  },
};

// Score weights — favor 2-3, 0 is rare but possible.
const SCORE_WEIGHTS: Record<number, number> = { 0: 5, 1: 15, 2: 30, 3: 25, 4: 15, 5: 10 };

export const pickWeightedScore = (): number => {
  const total = Object.values(SCORE_WEIGHTS).reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (const [score, w] of Object.entries(SCORE_WEIGHTS)) {
    r -= w;
    if (r <= 0) return Number(score);
  }
  return 2;
};

const routePool = (memo: string): IPoolKey => {
  const m = memo.toLowerCase();
  for (const { key, words } of KEYWORD_MAP) {
    if (words.some((w) => m.includes(w))) return key;
  }
  return "generic";
};

export const mockJudge = (memo: string, tone: ITone = "soft"): IJudgeResult => {
  const poolKey = routePool(memo ?? "");
  const pool = COMMENTS[poolKey][tone] ?? COMMENTS.generic[tone];
  const targetScore = pickWeightedScore();

  // Try to match the target score; else pick a close one; else random.
  const exact = pool.filter((e) => e.score === targetScore);
  if (exact.length > 0) {
    return exact[Math.floor(Math.random() * exact.length)];
  }
  // closest by absolute distance
  const sorted = [...pool].sort((a, b) => Math.abs(a.score - targetScore) - Math.abs(b.score - targetScore));
  const minDist = Math.abs(sorted[0].score - targetScore);
  const closest = sorted.filter((e) => Math.abs(e.score - targetScore) === minDist);
  return closest[Math.floor(Math.random() * closest.length)];
};
