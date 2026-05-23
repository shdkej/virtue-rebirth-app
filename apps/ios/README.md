# virtue-rebirth-ios

`virtue-rebirth-app`(Next.js)의 네이티브 iOS 포트. SwiftUI + SwiftData + CloudKit.

## 구조

```
Sources/
├── App/                       # 진입점, RootView(TabView)
├── Core/
│   ├── Models/                # DeedRecord(@Model), Species, Score
│   ├── Store/                 # DeedStats (집계 헬퍼)
│   ├── Services/              # ScoreService (Lambda 호출)
│   └── Theme/                 # 색/토큰
└── Features/                  # Home/Add/Deeds/Dex/Me
Resources/
├── Info.plist                 # 권한 + ScoreAPIURL
└── VirtueRebirth.entitlements # CloudKit
```

## 첫 빌드까지

```bash
brew install xcodegen
cd ~/workspace/virtue-rebirth-ios

# SST로 Lambda 배포(`cd ~/workspace/virtue-rebirth-lambda && pnpm deploy:dev`)
# 후 출력된 scoreUrl을 주입
export SCORE_API_URL="https://abc123.lambda-url.ap-northeast-2.on.aws/"
xcodegen generate
open VirtueRebirth.xcodeproj
```

Xcode에서:
1. **Signing & Capabilities** → Team 선택, Bundle ID 확인 (`com.shdkej.virtuerebirth`)
2. **iCloud** 카테고리 → CloudKit 체크, 컨테이너 `iCloud.com.shdkej.virtuerebirth` 생성
3. SwiftData 컨테이너에 CloudKit 동기화 활성화 (`VirtueRebirthApp.swift`의 `.modelContainer` 옵션에 `cloudKitDatabase: .private("iCloud.com.shdkej.virtuerebirth")` 추가)

## 아키텍처 메모

- **저장**: SwiftData `@Model DeedRecord` → CloudKit Private DB로 동기 (iCloud 로그인된 디바이스 간 자동)
- **사진**: `@Attribute(.externalStorage)` 로 분리 저장. CloudKit은 자산(asset)으로 자동 처리
- **API 키 보안**: 앱에는 절대 키 없음. `ScoreAPIURL`만 들고 있고 채점은 Lambda가 수행
- **이미지 압축**: longest edge 1600px, JPEG 0.8 — base64 7MB 제한 안전 마진

## 웹과 동기화하는 것

| 항목 | 위치 | 동기화 정책 |
|------|------|-------------|
| 채점 프롬프트 | `virtue-rebirth-lambda/src/scorePrompt.ts` | 웹/람다 양쪽 동시 수정 |
| Species 테이블 | `Sources/Core/Models/Species.swift` | 웹 `src/lib/species.ts` 변경 시 수동 반영 |
| 이벤트 이름 | `deed_judged`, `deed_scored` 등 | 웹과 동일 명칭 사용 |

## 다음 할 일

- [ ] App Icon / Launch Screen 디자인 채우기
- [ ] PostHog iOS SDK 연결 (SPM: `https://github.com/PostHog/posthog-ios`)
- [ ] CloudKit 스키마 첫 푸시 (개발 환경에서 한번 실행 후 CloudKit Dashboard에서 Production으로 deploy)
- [ ] App Attest로 Lambda 호출 인증
- [ ] TestFlight 업로드
