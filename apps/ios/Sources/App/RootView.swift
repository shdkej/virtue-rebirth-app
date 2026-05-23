import SwiftUI

struct RootView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem { Label("홈", systemImage: "circle.hexagongrid.fill") }
            AddDeedView()
                .tabItem { Label("추가", systemImage: "plus.circle.fill") }
            DeedListView()
                .tabItem { Label("선행", systemImage: "list.bullet") }
            SpeciesDexView()
                .tabItem { Label("도감", systemImage: "books.vertical") }
            MeView()
                .tabItem { Label("나", systemImage: "person.crop.circle") }
        }
        .tint(Theme.accent)
    }
}
