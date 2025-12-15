import SwiftUI
import Charts

struct BudgetView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Summary Card
                    CardView {
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Total Monthly")
                                    .font(.caption)
                                    .foregroundColor(Theme.textMuted)
                                Text("$1,500.00")
                                    .font(.title)
                                    .fontWeight(.bold)
                                    .foregroundColor(Theme.textEmphasis)
                            }
                            Spacer()
                            CircularProgress(progress: 0.45)
                        }
                    }
                    .padding(.horizontal)
                    
                    // Detailed List
                    VStack(alignment: .leading) {
                        Text("Breakdown")
                            .font(.headline)
                            .padding(.horizontal)
                        
                        ForEach(sampleBudgetData) { category in
                            BudgetCategoryRow(category: category)
                        }
                    }
                }
                .padding(.vertical)
            }
            .navigationTitle("Budget")
            .background(Theme.bgDarkest)
        }
    }
}

struct BudgetCategoryRow: View {
    let category: BudgetCategory
    
    var body: some View {
        HStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(category.color)
                .frame(width: 48, height: 48)
                .overlay(
                    Image(systemName: "dollarsign")
                        .foregroundColor(.white)
                )
            
            VStack(alignment: .leading) {
                Text(category.name)
                    .font(.headline)
                    .foregroundColor(Theme.textEmphasis)
                ProgressView(value: 0.5) // Placeholder progress
                    .tint(category.color)
            }
            
            Spacer()
            
            Text("$\(Int(category.value))")
                .fontWeight(.bold)
        }
        .padding()
        .background(Theme.bgDark)
        .cornerRadius(16)
        .padding(.horizontal)
        .shadow(color: Color.black.opacity(0.02), radius: 5, x: 0, y: 2)
    }
}

struct CircularProgress: View {
    let progress: Double
    
    var body: some View {
        ZStack {
            Circle()
                .stroke(Theme.bgDarkest, lineWidth: 8)
                .frame(width: 60, height: 60)
            
            Circle()
                .trim(from: 0, to: progress)
                .stroke(Theme.pinkEmphasis, style: StrokeStyle(lineWidth: 8, lineCap: .round))
                .frame(width: 60, height: 60)
                .rotationEffect(.degrees(-90))
        }
    }
}
