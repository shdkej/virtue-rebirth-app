import SwiftUI
import SwiftData

struct SpeciesDexView: View {
    @Query private var deeds: [DeedRecord]

    var body: some View {
        let total = DeedStats.total(deeds)
        let current = SpeciesCatalog.current(forTotal: total)

        NavigationStack {
            List(SpeciesCatalog.all) { s in
                let unlocked = total >= s.min
                HStack(spacing: 16) {
                    Group {
                        if unlocked {
                            Image(s.assetName).resizable().scaledToFit()
                        } else {
                            Text("❔").font(.system(size: 36))
                        }
                    }
                    .frame(width: 56, height: 56)
                    VStack(alignment: .leading) {
                        Text(unlocked ? s.name : "???")
                            .bold()
                            .foregroundStyle(s.stage == current.stage ? Theme.accent : .primary)
                        Text("\(s.min) ~ \(s.max == .max ? "∞" : String(s.max)) 덕")
                            .font(.caption).foregroundStyle(Theme.muted)
                    }
                    Spacer()
                    if s.stage == current.stage {
                        Text("현재").font(.caption2).padding(6).background(Theme.accent.opacity(0.15)).clipShape(.capsule)
                    }
                }
            }
            .navigationTitle("환생 도감")
        }
    }
}
