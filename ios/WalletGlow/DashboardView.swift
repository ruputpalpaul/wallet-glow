import SwiftUI
import Charts

struct DashboardView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Welcome back, bestie! ✨")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(Theme.textEmphasis)
                        Text("Here's how you're doing today")
                            .font(.subheadline)
                            .foregroundColor(Theme.textMuted)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    
                    // 1. Budget Card
                    BudgetChartCard()
                    
                    // 2. Oh Sh*t Fund & Cash Mode Row
                    HStack(spacing: 16) {
                        OhShitFundCard()
                        CashModeCard()
                    }
                    .padding(.horizontal)
                    
                    // 3. Wishlist Preview
                    WishlistPreviewCard()
                    
                    // 4. Trigger Map
                    TriggerMapCard()
                }
                .padding(.vertical)
            }
            .background(Theme.bgDarkest)
            .navigationBarHidden(true)
        }
    }
}

// MARK: - Subcomponents

struct CardView<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        content
            .padding()
            .background(Theme.bgDark)
            .cornerRadius(24)
            .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
    }
}

struct BudgetChartCard: View {
    var body: some View {
        CardView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Your Budget at a Glance")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(Theme.textEmphasis)
                
                HStack(spacing: 20) {
                    // Chart
                    Group {
                        if #available(iOS 17.0, *) {
                            Chart(sampleBudgetData) { item in
                                SectorMark(
                                    angle: .value("Value", item.value),
                                    innerRadius: .ratio(0.618),
                                    angularInset: 1.5
                                )
                                .cornerRadius(5)
                                .foregroundStyle(item.color)
                            }
                            .frame(width: 140, height: 140)
                        } else {
                            // iOS 16 fallback: horizontal bars
                            Chart(sampleBudgetData) { item in
                                BarMark(
                                    x: .value("Value", item.value),
                                    y: .value("Category", item.name)
                                )
                                .foregroundStyle(item.color)
                            }
                            .frame(height: 140)
                        }
                    }
                    
                    // Legend
                    VStack(alignment: .leading, spacing: 8) {
                        ForEach(sampleBudgetData) { item in
                            HStack {
                                Circle()
                                    .fill(item.color)
                                    .frame(width: 8, height: 8)
                                Text(item.name)
                                    .font(.caption)
                                    .foregroundColor(Theme.textDefault)
                                Spacer()
                                Text("$\(Int(item.value))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(Theme.textEmphasis)
                            }
                        }
                    }
                }
            }
        }
        .padding(.horizontal)
    }
}

struct OhShitFundCard: View {
    var body: some View {
        CardView {
            VStack {
                Text("The \"Oh Sh*t\" Fund")
                    .font(.caption)
                    .fontWeight(.bold)
                    .multilineTextAlignment(.center)
                    .foregroundColor(Theme.textEmphasis)
                
                ZStack {
                    Circle()
                        .stroke(Theme.pinkBgMuted, lineWidth: 8)
                        .frame(width: 80, height: 80)
                    
                    Circle()
                        .trim(from: 0, to: 0.68)
                        .stroke(Theme.pinkEmphasis, style: StrokeStyle(lineWidth: 8, lineCap: .round))
                        .frame(width: 80, height: 80)
                        .rotationEffect(.degrees(-90))
                    
                    Text("68%")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(Theme.pinkEmphasis)
                }
                .padding(.vertical, 8)
                
                Text("$3,400")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(Theme.textEmphasis)
                Text("of $5,000 goal")
                    .font(.caption2)
                    .foregroundColor(Theme.textMuted)
            }
        }
        .frame(maxWidth: .infinity)
    }
}

struct CashModeCard: View {
    @State private var isProtectionOn = true
    
    var body: some View {
        CardView {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Text("Cash-First\nMode")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(Theme.textEmphasis)
                    Spacer()
                    Toggle("", isOn: $isProtectionOn)
                        .labelsHidden()
                        .tint(Theme.pinkEmphasis)
                        .scaleEffect(0.8)
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    Label("Protection: \(isProtectionOn ? "ON" : "OFF")", systemImage: "creditcard.fill")
                        .font(.caption2)
                        .foregroundColor(Theme.textDefault)
                    Label("Debit allowed", systemImage: "dollarsign.circle.fill")
                         .font(.caption2)
                         .foregroundColor(Theme.textDefault)
                }
            }
        }
        .frame(maxWidth: .infinity)
    }
}

struct WishlistPreviewCard: View {
    var body: some View {
        CardView {
            VStack(alignment: .leading, spacing: 16) {
                HStack {
                    Text("Cooling Off Wishlist")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(Theme.textEmphasis)
                    Spacer()
                    Text("\(sampleWishlistItems.count) items")
                        .font(.caption)
                        .foregroundColor(Theme.textMuted)
                }
                
                ForEach(sampleWishlistItems) { item in
                    HStack {
                        VStack(alignment: .leading) {
                            Text(item.name)
                                .font(.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(Theme.textEmphasis)
                            HStack(spacing: 4) {
                                Image(systemName: "clock")
                                    .font(.caption2)
                                Text("\(item.hoursLeft)h left")
                                    .font(.caption2)
                            }
                            .foregroundColor(Theme.textMuted)
                        }
                        
                        Spacer()
                        
                        VStack(alignment: .trailing) {
                            Text(item.formattedPrice)
                                .font(.subheadline)
                                .fontWeight(.bold)
                                .foregroundColor(Theme.pinkEmphasis)
                            Text(item.hoursLeft < 24 ? "Almost there!" : "Still thinking...")
                                .font(.caption2)
                                .foregroundColor(Theme.textMuted)
                        }
                    }
                    .padding()
                    .background(Theme.pinkBgSubtle)
                    .cornerRadius(16)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Theme.pinkBgMuted, lineWidth: 1)
                    )
                }
            }
        }
        .padding(.horizontal)
    }
}

struct TriggerMapCard: View {
    var body: some View {
        CardView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Shopping Trigger Map")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(Theme.textEmphasis)
                
                Group {
                    if #available(iOS 17.0, *) {
                        Chart(sampleTriggerData) { item in
                            BarMark(
                                x: .value("Day", item.day),
                                y: .value("Attempts", item.attempts)
                            )
                            .foregroundStyle(Theme.pinkEmphasis)
                            .cornerRadius(4)
                        }
                    } else {
                        Chart(sampleTriggerData) { item in
                            BarMark(
                                x: .value("Day", item.day),
                                y: .value("Attempts", item.attempts)
                            )
                            .foregroundStyle(Theme.pinkEmphasis)
                        }
                    }
                }
                .frame(height: 180)
                
                Text("✨ Peak time: Tue @ 10 PM")
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(Theme.pinkEmphasis)
            }
        }
        .padding(.horizontal)
    }
}
