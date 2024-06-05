//
//  MainButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI
import AppKit

typealias ButtonAction = () -> Void

struct MainButton: View {
    let text: String
    let action: ButtonAction
    let color: Color
    let shortcut: KeyEquivalent?
    
    init(text: String, action: @escaping ButtonAction, color: Color = .accentColor, shortcut: KeyEquivalent? = nil) {
        self.text = text
        self.action = action
        self.color = color
        self.shortcut = shortcut
    }

    var body: some View {
        let button = Button(action: action) {
            Text(text)
                .customFont(size: 10)
                .padding(2)
        }
            .buttonStyle(MainButtonStyle(color: color))

        if let shortcut {
            button.keyboardShortcut(shortcut)
        } else {
            button
        }
    }
}

struct MainButtonStyle: ButtonStyle {
    let color: Color
    
    func makeBody(configuration: Self.Configuration) -> some View {
        configuration.label
            .padding(6)
            .foregroundColor(.white)
            .background(color)
            .cornerRadius(6.0)
    }
}

#Preview {
    MainButton(text: "Test", action: { print("Clicked") }, color: .blue)
}
