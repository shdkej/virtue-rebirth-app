import Foundation

struct Species: Identifiable, Hashable {
    let stage: Int
    let name: String
    let emoji: String        // fallback (이미지 로딩 실패 시)
    let assetName: String    // Assets.xcassets/Species/<assetName>
    let min: Int
    let max: Int
    var id: Int { stage }

    func contains(_ value: Int) -> Bool { value >= min && value <= max }
    var progressDenominator: Int { Swift.max(1, max - min + 1) }
}

enum SpeciesCatalog {
    static let initialVirtue: Int = 0

    static let all: [Species] = [
        .init(stage: 0,  name: "돌",          emoji: "🪨", assetName: "Species/00-rock",        min: 0,     max: 49),
        .init(stage: 1,  name: "송충이",       emoji: "🐛", assetName: "Species/01-caterpillar", min: 50,    max: 199),
        .init(stage: 2,  name: "달팽이",       emoji: "🐌", assetName: "Species/02-snail",       min: 200,   max: 499),
        .init(stage: 3,  name: "고슴도치",     emoji: "🦔", assetName: "Species/03-hedgehog",    min: 500,   max: 999),
        .init(stage: 4,  name: "길고양이",     emoji: "🐈", assetName: "Species/04-cat",         min: 1000,  max: 1999),
        .init(stage: 5,  name: "진돗개",       emoji: "🐕", assetName: "Species/05-jindo",       min: 2000,  max: 3999),
        .init(stage: 6,  name: "돌고래",       emoji: "🐬", assetName: "Species/06-dolphin",     min: 4000,  max: 6999),
        .init(stage: 7,  name: "코끼리",       emoji: "🐘", assetName: "Species/07-elephant",    min: 7000,  max: 9999),
        .init(stage: 8,  name: "인간(다시)",   emoji: "🧑", assetName: "Species/08-human",       min: 10000, max: 19999),
        .init(stage: 9,  name: "???",         emoji: "✨", assetName: "Species/09-mystery",     min: 20000, max: 49999),
        .init(stage: 10, name: "천계의 무언가", emoji: "🌌", assetName: "Species/10-celestial",   min: 50000, max: .max),
    ]

    static func current(forTotal total: Int) -> Species {
        all.first { $0.contains(total) } ?? all[0]
    }

    static func next(after stage: Int) -> Species? {
        all.first { $0.stage == stage + 1 }
    }
}
