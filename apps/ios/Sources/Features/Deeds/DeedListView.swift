import SwiftUI
import SwiftData

struct DeedListView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \DeedRecord.createdAt, order: .reverse) private var deeds: [DeedRecord]

    var body: some View {
        NavigationStack {
            List {
                if deeds.isEmpty {
                    ContentUnavailableView("아직 기록이 없어요", systemImage: "leaf",
                                           description: Text("선행을 추가해 보세요."))
                }
                ForEach(deeds) { d in
                    HStack(spacing: 12) {
                        if let data = d.photoData, let ui = UIImage(data: data) {
                            Image(uiImage: ui).resizable().scaledToFill()
                                .frame(width: 56, height: 56).clipShape(.rect(cornerRadius: 8))
                        }
                        VStack(alignment: .leading, spacing: 2) {
                            HStack {
                                Text("\(d.score) 덕").bold().foregroundStyle(Theme.scoreColor(d.score))
                                Text(d.createdAt, style: .date).font(.caption).foregroundStyle(Theme.muted)
                            }
                            Text(d.comment).font(.subheadline).lineLimit(2)
                            if !d.tags.isEmpty {
                                Text(d.tags.map { "#\($0)" }.joined(separator: " "))
                                    .font(.caption2).foregroundStyle(Theme.muted)
                            }
                        }
                    }
                }
                .onDelete { idx in
                    for i in idx { context.delete(deeds[i]) }
                }
            }
            .navigationTitle("선행 기록")
        }
    }
}
