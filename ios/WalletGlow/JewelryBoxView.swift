import SwiftUI

struct JewelryBoxView: View {
    @State private var showConfetti = false
    
    let charms = [
        "👑", "💎", "🎀", "🦢", "✨", "🧸", "💿", "🩰"
    ]
    
    var body: some View {
        NavigationStack {
            ZStack {
                Theme.bgDarkest.ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 24) {
                        // Header
                        VStack(spacing: 8) {
                            Text("Jewelry Box")
                                .font(.largeTitle)
                                .fontWeight(.bold)
                                .foregroundColor(Theme.textEmphasis)
                            Text("Collect charms by resisting impulses!")
                                .font(.subheadline)
                                .foregroundColor(Theme.textMuted)
                        }
                        .padding(.top)
                        
                        // Action Button
                        Button(action: {
                            showConfetti.toggle()
                        }) {
                            Text(showConfetti ? "Stop Celebration" : "Test Reward Animation")
                                .fontWeight(.bold)
                                .padding()
                                .frame(maxWidth: .infinity)
                                .background(Theme.pinkEmphasis)
                                .foregroundColor(.white)
                                .cornerRadius(16)
                                .shadow(color: Theme.pinkEmphasis.opacity(0.3), radius: 10, x: 0, y: 5)
                        }
                        .padding(.horizontal)
                        
                        // Grid
                        LazyVGrid(columns: [GridItem(.adaptive(minimum: 80))], spacing: 20) {
                            ForEach(charms, id: \.self) { charm in
                                CharmItem(emoji: charm, isUnlocked: true)
                            }
                            ForEach(0..<12) { _ in
                                CharmItem(emoji: "🔒", isUnlocked: false)
                            }
                        }
                        .padding()
                    }
                }
                
                if showConfetti {
                    ConfettiView()
                        .allowsHitTesting(false)
                }
            }
        }
    }
}

struct CharmItem: View {
    let emoji: String
    let isUnlocked: Bool
    
    var body: some View {
        ZStack {
            Circle()
                .fill(isUnlocked ? Theme.bgDark : Theme.bgMid)
                .frame(width: 72, height: 72)
                .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
            
            Text(emoji)
                .font(.system(size: 32))
                .opacity(isUnlocked ? 1 : 0.4)
                .grayscale(isUnlocked ? 0 : 1)
        }
    }
}

// Minimal Confetti Implementation using Canvas
struct ConfettiView: View {
    var body: some View {
        TimelineView(.animation) { timeline in
            Canvas { context, size in
                let time = timeline.date.timeIntervalSinceReferenceDate
                for i in 0..<50 {
                    let angle = Double(i) * (360.0 / 50.0)
                    let x = size.width / 2 + cos(angle + time) * (Double(i) * 5 + time * 20).remainder(dividingBy: 300)
                    let y = size.height / 2 + sin(angle + time) * (Double(i) * 5 + time * 30).remainder(dividingBy: 500)
                    
                    var p = Path()
                    p.addEllipse(in: CGRect(x: x, y: y, width: 8, height: 8))
                    
                    context.fill(p, with: .color(i % 2 == 0 ? Theme.pinkEmphasis : Theme.pinkDefault))
                }
            }
        }
    }
}
