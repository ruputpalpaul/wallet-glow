import SwiftUI

struct WishlistView: View {
    @State private var items = sampleWishlistItems
    
    var body: some View {
        NavigationStack {
            List {
                Section(header: Text("Cooling Off").font(.caption).foregroundColor(Theme.textMuted)) {
                    ForEach(items.filter { $0.hoursLeft > 0 }) { item in
                        WishlistRow(item: item)
                    }
                }
                
                Section(header: Text("Ready to Buy").font(.caption).foregroundColor(Theme.textMuted)) {
                    ForEach(items.filter { $0.hoursLeft <= 0 }) { item in
                        WishlistRow(item: item)
                    }
                    if items.filter({ $0.hoursLeft <= 0 }).isEmpty {
                        Text("No items ready yet. Good job waiting! 💖")
                            .font(.subheadline)
                            .foregroundColor(Theme.textMuted)
                            .padding(.vertical)
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Wishlist")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button(action: {
                        // Action to add item
                    }) {
                        Image(systemName: "plus.circle.fill")
                            .foregroundColor(Theme.pinkEmphasis)
                    }
                }
            }
            .background(Theme.bgDarkest) // List background color fix
            .scrollContentBackground(.hidden) // Hide default gray
        }
    }
}

struct WishlistRow: View {
    let item: WishlistItem
    
    var body: some View {
        HStack(spacing: 16) {
            // Icon Placeholder
            ZStack {
                Circle()
                    .fill(Theme.pinkBgSubtle)
                    .frame(width: 48, height: 48)
                Image(systemName: "gift.fill")
                    .foregroundColor(Theme.pinkDefault)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(item.name)
                    .font(.headline)
                    .foregroundColor(Theme.textEmphasis)
                
                if item.hoursLeft > 0 {
                    HStack(spacing: 4) {
                        Image(systemName: "hourglass")
                            .font(.caption2)
                        Text("\(item.hoursLeft)h remaining")
                            .font(.caption)
                    }
                    .foregroundColor(Theme.textMuted)
                } else {
                    Text("Ready!")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(Theme.pinkEmphasis)
                }
            }
            
            Spacer()
            
            Text(item.formattedPrice)
                .fontWeight(.bold)
                .foregroundColor(Theme.textDefault)
        }
        .padding(.vertical, 4)
    }
}
