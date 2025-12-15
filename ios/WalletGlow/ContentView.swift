import SwiftUI

struct ContentView: View {
    @State private var selectedTab: Tab = .home

    enum Tab {
        case home, budget, wishlist, jewelry, learn, settings
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            // Home (Dashboard)
            DashboardView()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(Tab.home)

            // Budget
            BudgetView()
                .tabItem {
                    Label("Budget", systemImage: "chart.pie.fill")
                }
                .tag(Tab.budget)

            // Wishlist
            WishlistView()
                .tabItem {
                    Label("Wishlist", systemImage: "heart.fill")
                }
                .tag(Tab.wishlist)

            // Jewelry Box
            JewelryBoxView()
                .tabItem {
                    Label("Jewelry", systemImage: "sparkles")
                }
                .tag(Tab.jewelry)

            // Learn
            LearnView()
                .tabItem {
                    Label("Learn", systemImage: "book.fill")
                }
                .tag(Tab.learn)
        }
        .accentColor(Theme.pinkEmphasis)
    }
}
