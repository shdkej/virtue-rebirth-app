import SwiftUI
import SwiftData

struct MeView: View {
    @Environment(\.modelContext) private var context
    @Query private var deeds: [DeedRecord]
    @AppStorage("tone") private var toneRaw: String = Tone.soft.rawValue
    @AppStorage("dailyCap") private var dailyCap: Bool = true
    @State private var showResetConfirm = false

    var body: some View {
        NavigationStack {
            Form {
                Section("말투") {
                    Picker("말투", selection: $toneRaw) {
                        ForEach(Tone.allCases) { Text($0.label).tag($0.rawValue) }
                    }.pickerStyle(.segmented)
                }
                Section("기록") {
                    LabeledContent("총 선행", value: "\(deeds.count) 건")
                    LabeledContent("누적 덕", value: "\(DeedStats.total(deeds))")
                }
                Section {
                    Toggle("일일 상한 사용", isOn: $dailyCap)
                }
                Section {
                    Button("모든 기록 삭제", role: .destructive) { showResetConfirm = true }
                }
                Section("정보") {
                    LabeledContent("백엔드", value: (Bundle.main.object(forInfoDictionaryKey: "ScoreAPIURL") as? String) ?? "-")
                }
            }
            .navigationTitle("나")
            .confirmationDialog("정말 삭제할까요?", isPresented: $showResetConfirm, titleVisibility: .visible) {
                Button("전체 삭제", role: .destructive) {
                    for d in deeds { context.delete(d) }
                }
                Button("취소", role: .cancel) {}
            }
        }
    }
}
