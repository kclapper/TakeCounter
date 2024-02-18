//
//  ResetButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct ResetButton: View {
    @AppStorage(AppSettings.resetShortcut.name) var resetShortcut = AppSettings.resetShortcut.defaultValue
    
    var action: () -> Void
    
    var body: some View {
        MainButton(text: "Reset", action: action, color: .red)
            .keyboardShortcut(makeShortcut(fromString: resetShortcut))
    }
}

#Preview {
    ResetButton(action: {})
}
