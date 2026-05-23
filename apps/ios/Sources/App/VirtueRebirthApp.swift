import SwiftUI
import SwiftData

@main
struct VirtueRebirthApp: App {
    init() {
        Analytics.configure()
    }

    var body: some Scene {
        WindowGroup {
            RootView()
        }
        .modelContainer(for: [DeedRecord.self])
    }
}
