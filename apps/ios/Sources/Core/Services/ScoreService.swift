import Foundation
import UIKit

/// 백엔드 Lambda(/score) 를 호출해 사진+메모 → 점수 결과를 받아온다.
/// Anthropic API 키는 서버에만 존재. 앱은 절대 키를 갖지 않는다.
struct ScoreService {
    private let endpoint: URL
    private let session: URLSession

    init(session: URLSession = .shared) {
        self.session = session
        let raw = (Bundle.main.object(forInfoDictionaryKey: "ScoreAPIURL") as? String) ?? ""
        // 빌드 시 SCORE_API_URL 미주입 상태(=문자열 그대로 "$(SCORE_API_URL)") 방어
        let trimmed = raw.hasPrefix("$") ? "" : raw
        // 기본값: production 도메인. 개발 빌드는 Info.plist의 ScoreAPIURL을 dev URL로 덮어쓰기.
        let fallback = "https://score.virtue.aws.shdkej.com/score"
        self.endpoint = URL(string: trimmed.isEmpty ? fallback : trimmed)
            ?? URL(string: "https://invalid.local")!
    }

    /// 결과 + 출처 표시. mock일 때 UI에서 안내 배너 띄울 수 있도록 source 분리.
    enum Source { case ai, aiFallback, mock }
    struct Scored { let result: ScoreResult; let source: Source; let modelHint: String? }

    func score(image: UIImage, memo: String?, tone: Tone) async throws -> Scored {
        guard endpoint.scheme == "https" else { throw ScoringError.configMissing }

        let (data, mime) = try compress(image)
        let body = ScoreRequest(
            imageBase64: data.base64EncodedString(),
            mimeType: mime,
            memo: memo?.trimmingCharacters(in: .whitespacesAndNewlines).nilIfEmpty,
            toneMode: tone
        )

        var req = URLRequest(url: endpoint)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try JSONEncoder().encode(body)
        req.timeoutInterval = 30

        do {
            let (respData, resp) = try await session.data(for: req)
            guard let http = resp as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
                return Self.mockResult(memo: memo)   // 5xx → mock 폴백
            }
            let parsed = try JSONDecoder().decode(ScoreResponse.self, from: respData)
            let src: Source = (parsed.source == "ai_fallback") ? .aiFallback : .ai
            return Scored(
                result: ScoreResult(score: parsed.score, comment: parsed.comment, tags: parsed.tags),
                source: src,
                modelHint: parsed.model
            )
        } catch {
            return Self.mockResult(memo: memo)        // 네트워크 실패 → mock 폴백
        }
    }

    /// 채점 서버가 죽었을 때도 흐름이 끊기지 않도록 결정론적 mock 점수를 돌려준다.
    /// 사용자에게는 UI에서 "임시 점수" 배지를 띄워 재시도를 유도한다.
    private static func mockResult(memo: String?) -> Scored {
        let base = (memo?.isEmpty == false) ? 2 : 1
        return Scored(
            result: ScoreResult(
                score: base,
                comment: "채점 서버가 잠시 쉬고 있어요. 임시 점수예요.",
                tags: ["임시"]
            ),
            source: .mock,
            modelHint: nil
        )
    }

    /// 7MB(base64 후) 한도를 안전하게 넘기 위해 longest edge 1600px, JPEG 0.8로 압축.
    private func compress(_ image: UIImage) throws -> (Data, String) {
        let maxEdge: CGFloat = 1600
        let scale = min(1.0, maxEdge / max(image.size.width, image.size.height))
        let size = CGSize(width: image.size.width * scale, height: image.size.height * scale)
        let renderer = UIGraphicsImageRenderer(size: size)
        let resized = renderer.image { _ in image.draw(in: CGRect(origin: .zero, size: size)) }
        guard let jpeg = resized.jpegData(compressionQuality: 0.8) else {
            throw ScoringError.unknown("이미지 인코딩 실패")
        }
        return (jpeg, "image/jpeg")
    }
}

private extension String {
    var nilIfEmpty: String? { isEmpty ? nil : self }
}
