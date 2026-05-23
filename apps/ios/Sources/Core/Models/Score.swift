import Foundation

enum Tone: String, Codable, CaseIterable, Identifiable {
    case soft, casual
    var id: String { rawValue }
    var label: String { self == .soft ? "부드러운 존댓말" : "친한 친구" }
}

struct ScoreRequest: Codable {
    let imageBase64: String
    let mimeType: String      // image/jpeg | image/png | image/webp | image/gif
    let memo: String?
    let toneMode: Tone?
}

struct ScoreResult: Codable, Equatable {
    let score: Int
    let comment: String
    let tags: [String]
}

struct ScoreResponse: Codable {
    let source: String?
    let model: String?
    let score: Int
    let comment: String
    let tags: [String]
}

enum ScoringError: Error, LocalizedError {
    case configMissing
    case http(Int, String?)
    case decoding(String)
    case unknown(String)

    var errorDescription: String? {
        switch self {
        case .configMissing: return "백엔드 URL 설정이 없습니다 (Info.plist ScoreAPIURL)."
        case .http(let code, let msg): return "채점 서버 오류 (\(code)) \(msg ?? "")"
        case .decoding(let msg): return "응답 파싱 실패: \(msg)"
        case .unknown(let msg): return msg
        }
    }
}
