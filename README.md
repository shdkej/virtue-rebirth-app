# virtue-rebirth

선행(deed)을 기록하고 채점받아 종(species)으로 환생/진화하는 서비스의 모노레포.

## 구조

```
virtue-rebirth/
├ apps/
│ ├ web/   — Next.js 16 프론트엔드 + API 라우트 (채점은 api로 프록시)
│ ├ api/   — SST 기반 Lambda 채점 엔진 (Gemini 사용)
│ └ ios/   — SwiftUI 네이티브 앱 (XcodeGen)
├ packages/  — 공유 패키지 (현재 비어 있음)
├ pnpm-workspace.yaml
└ package.json
```

- `web`과 `api`는 HTTP(`SCORE_LAMBDA_URL`)로 통신해 결합이 느슨하다.
- `web`/`api`는 pnpm 워크스페이스로 묶이고, `ios`는 독립 빌드(Xcode)다.

## 개발

```bash
pnpm install        # 루트 단일 lockfile로 web/api 의존성 설치

pnpm dev            # web 개발 서버 (:8030)
pnpm dev:api        # api(sst dev)
pnpm build          # web 프로덕션 빌드
pnpm lint           # web lint
pnpm typecheck      # web/api 전체 타입체크
pnpm deploy:api     # api 프로덕션 배포 (sst deploy)
```

### iOS

```bash
cd apps/ios
xcodegen generate   # project.yml → .xcodeproj
open VirtueRebirth.xcodeproj
```

## 앱별 상세

각 앱의 `README.md`를 참고한다: [web](apps/web/README.md) · [api](apps/api/README.md) · [ios](apps/ios/README.md)
