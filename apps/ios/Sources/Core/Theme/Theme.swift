import SwiftUI

enum Theme {
    static let accent = Color(red: 0.45, green: 0.32, blue: 0.85)   // 보랏빛 환생 톤
    static let surface = Color(.secondarySystemBackground)
    static let muted = Color.secondary

    static func scoreColor(_ score: Int) -> Color {
        switch score {
        case ...0: return .gray
        case 1...2: return .blue
        case 3...4: return .teal
        case 5...6: return .green
        case 7...8: return .orange
        default: return .pink
        }
    }
}
