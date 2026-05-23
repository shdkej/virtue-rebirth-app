import Foundation
import SwiftData

@Model
final class DeedRecord {
    @Attribute(.unique) var id: String
    var createdAt: Date
    var score: Int
    var comment: String
    var memo: String?
    var tagsCSV: String
    @Attribute(.externalStorage) var photoData: Data?

    init(
        id: String = "d-\(Int(Date().timeIntervalSince1970 * 1000))-\(UUID().uuidString.prefix(6))",
        createdAt: Date = .now,
        score: Int,
        comment: String,
        memo: String? = nil,
        tags: [String] = [],
        photoData: Data? = nil
    ) {
        self.id = id
        self.createdAt = createdAt
        self.score = score
        self.comment = comment
        self.memo = memo
        self.tagsCSV = tags.joined(separator: ",")
        self.photoData = photoData
    }

    var tags: [String] {
        tagsCSV.isEmpty ? [] : tagsCSV.split(separator: ",").map(String.init)
    }
}
