import SwiftUI

struct LearnView: View {
    @State private var expandedModule: String? = "adhd"
    
    let modules: [LearnModule] = [
        LearnModule(
            id: "budgeting",
            title: "Budgeting 101: The Soft Life Edition",
            subtitle: "Learn how to budget without the shame spiral",
            iconName: "wallet.pass.fill",
            iconColor: Theme.pinkEmphasis,
            duration: "5 min read",
            completed: true,
            content: nil
        ),
        LearnModule(
            id: "adhd",
            title: "Money & ADHD: Understanding Your Brain",
            subtitle: "Why impulse spending happens + what actually helps",
            iconName: "brain.head.profile",
            iconColor: Color.purple,
            duration: "7 min read",
            completed: false,
            content: LearnContentData(
                points: [
                    "ADHD brains seek dopamine - shopping provides instant gratification.",
                    "The \"now vs. not-now\" time blindness makes future consequences feel abstract.",
                    "Rejection sensitivity can trigger retail therapy when you're feeling down.",
                    "Executive dysfunction makes budgeting feel impossible - you need systems.",
                    "Hyperfocus can lead to research spirals that end in checkout pages."
                ],
                actionSteps: [
                    "🧠 Add friction: delete saved cards, use cash",
                    "⏰ Set purchase timers to interrupt impulse",
                    "📝 Keep a \"Why I Bought This\" journal",
                    "💕 Find dopamine alternatives: playlists, walks"
                ]
            )
        ),
        LearnModule(
            id: "debt",
            title: "Getting Out of Debt (Gently)",
            subtitle: "Practical strategies without the Dave Ramsey energy",
            iconName: "creditcard.fill",
            iconColor: .blue,
            duration: "6 min read",
            completed: false,
            content: nil
        ),
        LearnModule(
            id: "emergency",
            title: "Building Your \"Oh Sh*t\" Fund",
            subtitle: "Emergency savings for real life emergencies",
            iconName: "shield.fill",
            iconColor: Theme.pinkEmphasis,
            duration: "5 min read",
            completed: false,
            content: nil
        )
    ]
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Financial Education 💖")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(Theme.textEmphasis)
                        Text("Learn at your own pace - no shame, just support")
                            .font(.subheadline)
                            .foregroundColor(Theme.textMuted)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    
                    // Progress Card
                    ProgressCard()
                    
                    // Quick Win
                    QuickWinCard()
                    
                    // Modules
                    VStack(spacing: 16) {
                        ForEach(modules) { module in
                            LearnModuleCard(module: module, isExpanded: expandedModule == module.id) {
                                withAnimation {
                                    if expandedModule == module.id {
                                        expandedModule = nil
                                    } else {
                                        expandedModule = module.id
                                    }
                                }
                            }
                        }
                    }
                    .padding(.horizontal)
                }
                .padding(.vertical)
            }
            .navigationBarHidden(true)
            .background(Theme.bgDarkest)
        }
    }
}

// MARK: - Models

struct LearnModule: Identifiable {
    let id: String
    let title: String
    let subtitle: String
    let iconName: String
    let iconColor: Color
    let duration: String
    let completed: Bool
    let content: LearnContentData?
}

struct LearnContentData: Sendable {
    let points: [String]
    let actionSteps: [String]
}

// MARK: - Components

struct ProgressCard: View {
    var body: some View {
        CardView {
            VStack(spacing: 16) {
                HStack(alignment: .top) {
                    HStack(spacing: 12) {
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Theme.pinkBgSubtle)
                            .frame(width: 48, height: 48)
                            .overlay(
                                Image(systemName: "book.fill")
                                    .foregroundColor(Theme.pinkEmphasis)
                            )
                        
                        VStack(alignment: .leading) {
                            Text("Your Learning Journey")
                                .font(.headline)
                                .foregroundColor(Theme.textEmphasis)
                            Text("1 of 9 lessons completed")
                                .font(.caption)
                                .foregroundColor(Theme.textMuted)
                        }
                    }
                    
                    Spacer()
                    
                    VStack(alignment: .trailing) {
                        Text("11%")
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundColor(Theme.pinkEmphasis)
                        Text("COMPLETE")
                            .font(.system(size: 10))
                            .fontWeight(.bold)
                            .foregroundColor(Theme.textMuted)
                    }
                }
                
                // Progress Bar
                GeometryReader { geometry in
                    ZStack(alignment: .leading) {
                        Capsule()
                            .fill(Theme.pinkBgSubtle)
                            .frame(height: 8)
                        
                        Capsule()
                            .fill(Theme.pinkEmphasis)
                            .frame(width: geometry.size.width * 0.11, height: 8)
                    }
                }
                .frame(height: 8)
            }
        }
        .padding(.horizontal)
    }
}

struct QuickWinCard: View {
    var body: some View {
        CardView {
            HStack(alignment: .top, spacing: 12) {
                Image(systemName: "lightbulb.fill")
                    .foregroundColor(Theme.pinkEmphasis)
                    .padding(8)
                    .background(Color.white.opacity(0.5))
                    .cornerRadius(8)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text("Quick Win 💡")
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(Theme.textEmphasis)
                    Text("Right now action: Open your banking app and set up ONE automatic transfer of $10 to savings.")
                        .font(.subheadline)
                        .foregroundColor(Theme.textDefault)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
        }
        .padding(.horizontal)
    }
}

struct LearnModuleCard: View {
    let module: LearnModule
    let isExpanded: Bool
    let onTap: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Button(action: onTap) {
                HStack(alignment: .center, spacing: 12) {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(module.iconColor.opacity(0.1))
                        .frame(width: 48, height: 48)
                        .overlay(
                            Image(systemName: module.iconName)
                                .foregroundColor(module.iconColor)
                        )
                    
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(module.title)
                                .font(.headline)
                                .foregroundColor(Theme.textEmphasis)
                                .multilineTextAlignment(.leading)
                            
                            if module.completed {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundColor(Theme.pinkEmphasis)
                                    .font(.caption)
                            }
                        }
                        
                        Text(module.subtitle)
                            .font(.caption)
                            .foregroundColor(Theme.textMuted)
                            .multilineTextAlignment(.leading)
                    }
                    
                    Spacer()
                    
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .foregroundColor(Theme.textMuted)
                }
                .padding()
            }
            .background(Theme.bgDark)
            
            if isExpanded, let content = module.content {
                Divider()
                
                VStack(alignment: .leading, spacing: 16) {
                    // Points
                    ForEach(Array(content.points.enumerated()), id: \.offset) { index, point in
                        HStack(alignment: .top, spacing: 12) {
                            Circle()
                                .fill(Color.blue.opacity(0.1))
                                .frame(width: 20, height: 20)
                                .overlay(
                                    Text("\(index + 1)")
                                        .font(.system(size: 10, weight: .bold))
                                        .foregroundColor(.blue)
                                )
                            Text(point)
                                .font(.subheadline)
                                .foregroundColor(Theme.textDefault)
                        }
                    }
                    
                    // Action Steps
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Action Steps")
                            .font(.headline)
                            .foregroundColor(Theme.textEmphasis)
                        
                        ForEach(content.actionSteps, id: \.self) { step in
                            Text(step)
                                .font(.subheadline)
                                .foregroundColor(Theme.textMuted)
                                .padding(4)
                        }
                    }
                    .padding()
                    .background(Theme.pinkBgSubtle)
                    .cornerRadius(12)
                    
                    Button(action: {}) {
                        Text("Mark as Complete ✨")
                            .fontWeight(.bold)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Theme.pinkEmphasis)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                    }
                }
                .padding()
                .background(Theme.bgDark)
            }
        }
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(isExpanded ? Theme.pinkBorder : Color.clear, lineWidth: 1)
        )
    }
}
