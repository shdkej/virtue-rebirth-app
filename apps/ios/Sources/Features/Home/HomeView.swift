import SwiftUI
import SwiftData

struct HomeView: View {
    @Query(sort: \DeedRecord.createdAt, order: .reverse) private var deeds: [DeedRecord]

    var body: some View {
        let total = DeedStats.total(deeds)
        let species = SpeciesCatalog.current(forTotal: total)
        let next = SpeciesCatalog.next(after: species.stage)
        let progress: Double = {
            guard let next else { return 1 }
            let into = max(0, total - species.min)
            return min(1, Double(into) / Double(next.min - species.min))
        }()

        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    Image(species.assetName)
                        .resizable().scaledToFit()
                        .frame(width: 240, height: 240)
                        .padding(.top, 24)
                    Text(species.name).font(.title).bold()
                    Text("총 덕 \(total)").font(.headline).foregroundStyle(Theme.muted)
                    if let next {
                        ProgressView(value: progress) {
                            Text("다음: \(next.name) (\(next.min) 덕)").font(.caption)
                        }
                        .tint(Theme.accent)
                        .padding(.horizontal, 32)
                    }
                    HStack(spacing: 24) {
                        StatCell(label: "오늘", value: DeedStats.today(deeds))
                        StatCell(label: "이번달", value: DeedStats.month(deeds))
                        StatCell(label: "기록", value: deeds.count)
                    }
                }
                .padding()
            }
            .navigationTitle("환생 오브")
        }
    }
}

private struct StatCell: View {
    let label: String
    let value: Int
    var body: some View {
        VStack {
            Text("\(value)").font(.title2).bold()
            Text(label).font(.caption).foregroundStyle(Theme.muted)
        }
        .frame(maxWidth: .infinity).padding().background(Theme.surface).clipShape(.rect(cornerRadius: 12))
    }
}
