import Foundation

// Mark as Sendable to be safe for concurrent access
struct AppState: Sendable, Codable {
    var budget: Double
    var wishlistItems: [WishlistItem]
}

// Swift 6: Use 'actor' to protect mutable state and ensure thread safety
actor DataService {
    static let shared = DataService()
    
    private var state: AppState
    
    private init() {
        self.state = AppState(budget: 1500.0, wishlistItems: [])
    }
    
    // Swift 6.2: Typed Throws (simulated here as we don't have the exact error type yet, but good practice)
    enum DataError: Error {
        case fetchFailed
        case invalidInput
    }
    
    func fetchBudget() async throws(DataError) -> Double {
        // Simulate network delay
        try? await Task.sleep(nanoseconds: 500_000_000)
        return state.budget
    }
    
    func updateBudget(_ newValue: Double) {
        state.budget = newValue
    }
    
    func addToWishlist(_ item: WishlistItem) {
        state.wishlistItems.append(item)
    }
    
    func getWishlist() -> [WishlistItem] {
        return state.wishlistItems
    }
}
