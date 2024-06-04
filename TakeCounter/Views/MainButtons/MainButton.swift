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
    var text: String
    var action: ButtonAction
    let color: Color
    let shortcut: KeyEquivalent?
    
    init(text: String, action: @escaping ButtonAction, color: Color) {
        self.init(text: text, action: action, color: color, shortcut: nil)
    }
    
    init(text: String, action: @escaping ButtonAction, color: Color, shortcut: KeyEquivalent?) {
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
        .buttonStyle(.borderedProminent)
        .tint(.accentColor)

        if let shortcut {
            button.keyboardShortcut(shortcut)
        } else {
            button
        }
    }
}

#Preview {
    MainButton(text: "Test", action: { print("Clicked") }, color: .purple)
}
