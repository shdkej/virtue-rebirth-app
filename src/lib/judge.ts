export interface IJudgeResult {
  score: number;
  comment: string;
  tags: string[];
}

const COMMENTS: IJudgeResult[] = [
  { score: 2, comment: "사진 속 장면은 작지만 또렷한 친절이네요. 무릎 한 번 굽힌 만큼의 덕.", tags: ["배려", "일상"] },
  { score: 3, comment: "딱히 영웅적이진 않지만 누군가의 하루를 조금 덜 피곤하게 만들었어요.", tags: ["이웃", "수고"] },
  { score: 1, comment: "흠... 살짝 애매하지만 일단 마음은 받았어요. 1덕 드릴게요.", tags: ["애매", "일상"] },
  { score: 4, comment: "오늘 같은 날 이런 일을 했다면 다음 생에 길고양이는 면할지도.", tags: ["꾸준함", "동물"] },
  { score: 0, comment: "음, 이건 그냥 사진인 것 같은데요. 다음 기회에.", tags: ["판정불가"] },
  { score: 5, comment: "지나치게 친절합니다. 5덕 드릴 테니 좀 쉬세요.", tags: ["과잉친절"] },
];

export const mockJudge = (memo: string): IJudgeResult => {
  const hasContent = memo.trim().length > 2;
  const pool = hasContent ? COMMENTS.slice(0, 4).concat(COMMENTS[5]) : COMMENTS;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
};
