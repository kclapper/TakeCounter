//
//  IncrementButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct IncrementButton: View {
    @AppStorage(AppSettings.incrementShortcut.name) var incrementShortcut = AppSettings.incrementShortcut.defaultValue
    
    var action: () -> Void
    
    var body: some View {
        MainButton(text: "+", action: action, color: .blue, shortcut: makeShortcut(fromString: incrementShortcut))
    }
    
}

#Preview {
    IncrementButton(action: {})
}
