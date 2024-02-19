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
                .customFont(size: 10)
                .padding(2)
        }
        .buttonStyle(.borderedProminent)
        .tint(.accentColor)
    }
}

#Preview {
    MainButton(text: "Test", action: { print("Clicked") }, color: .purple)
}
