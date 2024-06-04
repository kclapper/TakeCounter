//
//  DecrementButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct DecrementButton: View {
    @AppStorage(AppSettings.decrementShortcut.name) var decrementShortcut = AppSettings.decrementShortcut.defaultValue
    
    var action: () -> Void
    
    var body: some View {
        MainButton(text: "-", action: action, color: .blue, shortcut: makeShortcut(fromString: decrementShortcut))
    }
}

#Preview {
    DecrementButton(action: {})
}
