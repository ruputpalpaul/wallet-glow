import SwiftUI

struct Theme {
    static let bgDarkest = Color(hex: "FAFAFA") // oklch(98% 0 0) - Alabaster/White
    static let bgDark = Color(hex: "FFFFFF")    // oklch(100% 0 0) - White
    
    // Brand Pinks (Approximated from OKLCH 345 hue)
    static let pinkBgSubtle = Color(red: 1.0, green: 0.95, blue: 0.96) // Light Pink
    static let pinkBgMuted = Color(red: 1.0, green: 0.92, blue: 0.94) // Muted Pink
    static let pinkBorder = Color(red: 0.98, green: 0.70, blue: 0.80) // Pink Border
    static let pinkDefault = Color(red: 0.96, green: 0.50, blue: 0.65) // Default Pink
    static let pinkEmphasis = Color(red: 0.92, green: 0.34, blue: 0.55) // Strong Pink
    
    static let textDefault = Color(hex: "333333")
    static let textMuted = Color(hex: "666666")
    static let textEmphasis = Color(hex: "111111")
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
