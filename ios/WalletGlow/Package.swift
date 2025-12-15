// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "WalletGlow",
    platforms: [
        .iOS(.v16)
    ],
    products: [
        .library(
            name: "WalletGlow",
            targets: ["WalletGlow"]),
    ],
    dependencies: [
        // Dependencies can be added here
        // .package(url: "https://github.com/supabase/supabase-swift.git", from: "2.0.0"),
    ],
    targets: [
        .target(
            name: "WalletGlow",
            dependencies: [],
            path: "." // Source files are in the same directory
        )
    ]
)
