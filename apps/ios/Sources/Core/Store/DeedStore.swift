import Foundation
import SwiftData

/// 집계 헬퍼. UI는 @Query 로 DeedRecord 를 직접 가져오고, 합산은 여기서 처리.
enum DeedStats {
    static func total(_ deeds: [DeedRecord]) -> Int {
        SpeciesCatalog.initialVirtue + deeds.reduce(0) { $0 + $1.score }
    }
    static func today(_ deeds: [DeedRecord], now: Date = .now) -> Int {
        let cal = Calendar.current
        return deeds.filter { cal.isDate($0.createdAt, inSameDayAs: now) }.reduce(0) { $0 + $1.score }
    }
    static func month(_ deeds: [DeedRecord], now: Date = .now) -> Int {
        let cal = Calendar.current
        let comps = cal.dateComponents([.year, .month], from: now)
        return deeds.filter {
            let c = cal.dateComponents([.year, .month], from: $0.createdAt)
            return c.year == comps.year && c.month == comps.month
        }.reduce(0) { $0 + $1.score }
    }
}
