import Foundation
import SwiftUI

struct BudgetCategory: Identifiable {
    let id = UUID()
    let name: String
    let value: Double
    let color: Color
}

struct TriggerData: Identifiable {
    let id = UUID()
    let day: String
    let attempts: Int
}

struct WishlistItem: Identifiable, Codable {
    let id: Int
    let name: String
    let price: Double
    let hoursLeft: Int
    
    var formattedPrice: String {
        return String(format: "$%.2f", price)
    }
}

// Sample Data
let sampleBudgetData = [
    BudgetCategory(name: "Safe to Spend", value: 450, color: Color(red: 0.58, green: 0.77, blue: 0.99)), // Blue
    BudgetCategory(name: "Bills & Fixed", value: 800, color: Theme.pinkEmphasis),
    BudgetCategory(name: "Savings Goal", value: 250, color: Color(red: 0.77, green: 0.71, blue: 0.99))  // Purple
]

let sampleTriggerData = [
    TriggerData(day: "Mon", attempts: 2),
    TriggerData(day: "Tue", attempts: 7),
    TriggerData(day: "Wed", attempts: 3),
    TriggerData(day: "Thu", attempts: 4),
    TriggerData(day: "Fri", attempts: 5),
    TriggerData(day: "Sat", attempts: 3),
    TriggerData(day: "Sun", attempts: 1)
]

let sampleWishlistItems = [
    WishlistItem(id: 1, name: "Aesthetic desk lamp", price: 45, hoursLeft: 36),
    WishlistItem(id: 2, name: "Yoga mat set", price: 67, hoursLeft: 12),
    WishlistItem(id: 3, name: "Minimalist planner", price: 28, hoursLeft: 48)
]
