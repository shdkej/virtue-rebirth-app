import Foundation
import PostHog

/// 웹(`virtue-rebirth-app`)과 같은 PostHog 프로젝트로 이벤트 송신.
/// 이름은 웹과 동일하게 유지 — distinct_id가 달라도 대시보드에서 같은 펀넬로 본다.
enum Analytics {
    static func configure() {
        let info = Bundle.main.infoDictionary
        let key = (info?["PostHogKey"] as? String) ?? ""
        let host = (info?["PostHogHost"] as? String) ?? "https://us.i.posthog.com"

        // Xcode 미주입 상태("$(POSTHOG_KEY)") 또는 빈 값이면 노옵.
        guard !key.isEmpty, !key.hasPrefix("$") else {
            print("[Analytics] PostHog 키 미설정 — 이벤트 송신 비활성")
            return
        }

        let config = PostHogConfig(apiKey: key, host: host)
        config.captureScreenViews = true
        config.captureApplicationLifecycleEvents = true
        config.sessionReplay = false
        PostHogSDK.shared.setup(config)
        PostHogSDK.shared.register(["platform": "ios"])
    }

    static func capture(_ event: String, _ props: [String: Any] = [:]) {
        PostHogSDK.shared.capture(event, properties: props)
    }
}
