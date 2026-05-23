import SwiftUI
import SwiftData
import PhotosUI

struct AddDeedView: View {
    @Environment(\.modelContext) private var context
    @State private var pickerItem: PhotosPickerItem?
    @State private var image: UIImage?
    @State private var memo: String = ""
    @State private var tone: Tone = .soft
    @State private var isScoring = false
    @State private var scored: ScoreService.Scored?
    @State private var errorMessage: String?

    private let service = ScoreService()

    var body: some View {
        NavigationStack {
            Form {
                Section("사진") {
                    if let image {
                        Image(uiImage: image).resizable().scaledToFit().frame(maxHeight: 240)
                    }
                    PhotosPicker(selection: $pickerItem, matching: .images) {
                        Label(image == nil ? "사진 선택" : "사진 변경", systemImage: "photo")
                    }
                }
                Section("메모 (선택)") {
                    TextField("어떤 선행이었어요?", text: $memo, axis: .vertical).lineLimit(2...4)
                }
                Section("말투") {
                    Picker("말투", selection: $tone) {
                        ForEach(Tone.allCases) { Text($0.label).tag($0) }
                    }.pickerStyle(.segmented)
                }
                if let scored {
                    Section("채점 결과") {
                        HStack {
                            Text("\(scored.result.score) 덕").font(.title2).bold()
                                .foregroundStyle(Theme.scoreColor(scored.result.score))
                            Spacer()
                            ForEach(scored.result.tags, id: \.self) { tag in
                                Text("#\(tag)").font(.caption).padding(6).background(Theme.surface).clipShape(.capsule)
                            }
                        }
                        Text(scored.result.comment)
                        switch scored.source {
                        case .ai: EmptyView()
                        case .aiFallback:
                            Label("백업 모델로 채점됨", systemImage: "arrow.triangle.2.circlepath")
                                .font(.caption).foregroundStyle(.orange)
                        case .mock:
                            Label("임시 점수예요. 잠시 후 다시 시도해 보세요.", systemImage: "exclamationmark.triangle")
                                .font(.caption).foregroundStyle(.orange)
                        }
                    }
                }
                if let errorMessage {
                    Section { Text(errorMessage).foregroundStyle(.red) }
                }
                Section {
                    Button(action: scoreNow) {
                        if isScoring { ProgressView() } else { Text("채점 받기") }
                    }
                    .disabled(image == nil || isScoring)

                    if let scored {
                        Button(scored.source == .mock ? "임시 점수로 저장" : "저장", action: save).bold()
                    }
                }
            }
            .navigationTitle("선행 추가")
            .onChange(of: pickerItem) { _, newItem in
                Task { await loadImage(from: newItem) }
            }
        }
    }

    private func loadImage(from item: PhotosPickerItem?) async {
        guard let item, let data = try? await item.loadTransferable(type: Data.self),
              let ui = UIImage(data: data) else { return }
        image = ui
        scored = nil
        errorMessage = nil
    }

    private func scoreNow() {
        guard let image else { return }
        isScoring = true
        errorMessage = nil
        Analytics.capture("deed_judge_attempted", [
            "has_photo": true,
            "has_memo": !memo.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
            "memo_length": memo.count,
            "tone": tone.rawValue,
            "scoring_mode": "ai",
        ])
        let startedAt = Date()
        Task {
            do {
                let s = try await service.score(image: image, memo: memo, tone: tone)
                scored = s
                Analytics.capture("deed_judged", [
                    "score": s.result.score,
                    "source": String(describing: s.source),
                    "model": s.modelHint ?? "",
                    "has_photo": true,
                    "tone": tone.rawValue,
                    "memo_length": memo.count,
                    "duration_ms": Int(Date().timeIntervalSince(startedAt) * 1000),
                ])
                if s.source != .ai {
                    Analytics.capture("score_fallback_shown", [
                        "source": String(describing: s.source),
                        "model": s.modelHint ?? "",
                    ])
                }
            } catch {
                errorMessage = (error as? LocalizedError)?.errorDescription ?? error.localizedDescription
                Analytics.capture("deed_judge_failed", ["message": error.localizedDescription])
            }
            isScoring = false
        }
    }

    private func save() {
        guard let scored, let image else { return }
        let record = DeedRecord(
            score: scored.result.score,
            comment: scored.result.comment,
            memo: memo.isEmpty ? nil : memo,
            tags: scored.result.tags,
            photoData: image.jpegData(compressionQuality: 0.7)
        )
        context.insert(record)
        Analytics.capture("deed_saved", [
            "score": scored.result.score,
            "source": String(describing: scored.source),
            "tone": tone.rawValue,
        ])
        self.scored = nil
        self.image = nil
        self.memo = ""
        self.pickerItem = nil
    }
}
