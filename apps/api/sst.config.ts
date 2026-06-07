// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "virtue-rebirth",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage ?? ""),
      home: "aws",
      providers: { aws: { region: "ap-northeast-2" } },
    };
  },
  async run() {
    const geminiKey = new sst.Secret("GEMINI_API_KEY");

    const domainName =
      $app.stage === "production"
        ? "score.virtue.aws.shdkej.com"
        : `score-${$app.stage}.virtue.aws.shdkej.com`;
    const allowedOrigins =
      $app.stage === "production"
        ? ["https://virtue.aws.shdkej.com", "https://virtue.oracle.shdkej.com"]
        : ["https://virtue.aws.shdkej.com", "http://localhost:3000", "http://localhost:3001"];

    const api = new sst.aws.ApiGatewayV2("ScoreApi", {
      domain: {
        name: domainName,
        dns: sst.aws.dns({ zone: "Z07242312C5BE3VLQW344" }),
      },
      cors: {
        allowOrigins: allowedOrigins,
        allowMethods: ["POST", "OPTIONS"],
        allowHeaders: ["content-type"],
      },
    });

    // 동시 Gemini 호출 상한 (= AI 호출량 1차 제어).
    // API Gateway stage throttling은 배포 후 CLI로 2 rps / burst 10을 적용한다.
    // RPM/TPM 정밀 제어가 필요해지면 핸들러에 Redis 토큰버킷 게이트를 추가한다.
    const SCORE_MAX_CONCURRENCY = 5;

    api.route("POST /score", {
      handler: "src/handler.handler",
      runtime: "nodejs20.x",
      timeout: "30 seconds",
      memory: "512 MB",
      concurrency: { reserved: SCORE_MAX_CONCURRENCY },
      link: [geminiKey],
      environment: {
        // gemini-3-pro-preview는 무료 키로 호출 불가(free tier quota=0).
        // README 문서값이자 무료 키로 동작하는 모델로 사용.
        SCORING_MODEL: "gemini-2.5-flash",
      },
    });

    return {
      scoreUrl: $interpolate`https://${domainName}/score`,
    };
  },
});
