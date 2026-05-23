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

    api.route("POST /score", {
      handler: "src/handler.handler",
      runtime: "nodejs20.x",
      timeout: "30 seconds",
      memory: "512 MB",
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
