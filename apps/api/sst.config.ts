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

    const api = new sst.aws.ApiGatewayV2("ScoreApi", {
      domain: {
        name: domainName,
        dns: sst.aws.dns({ zone: "Z07242312C5BE3VLQW344" }),
      },
      cors: {
        allowOrigins: ["*"],
        allowMethods: ["POST"],
        allowHeaders: ["content-type"],
      },
    });

    // 동시 Gemini 호출 상한 (= AI 호출량 1차 제어).
    // 동기 엔드포인트라 큐 대신 reserved concurrency로 병렬도를 묶는다.
    // 상한 초과 요청은 큐잉되지 않고 throttle(429/502)로 떨어진다 — 베타까진 OK.
    // RPM/TPM 정밀 제어가 필요해지면 핸들러에 Redis 토큰버킷 게이트 추가.
    const SCORE_MAX_CONCURRENCY = 5;

    api.route("POST /score", {
      handler: "src/handler.handler",
      runtime: "nodejs20.x",
      timeout: "30 seconds",
      memory: "512 MB",
      concurrency: { reserved: SCORE_MAX_CONCURRENCY },
      link: [geminiKey],
      environment: {
        SCORING_MODEL: "gemini-3-pro-preview",
      },
    });

    return {
      scoreUrl: $interpolate`https://${domainName}/score`,
    };
  },
});
