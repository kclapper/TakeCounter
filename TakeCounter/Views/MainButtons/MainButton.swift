//
//  MainButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI
import AppKit

struct MainButton: View {
    var text: String
    var action: () -> Void
    let color: Color
    
    var body: some View {
        Button(action: action) {
            Text(text)
                .font(.title)
                .padding(8)
        }
        .buttonStyle(.borderedProminent)
        .tint(color)
    }
}

#Preview {
    MainButton(text: "Test", action: { print("Clicked") }, color: .purple)
}
