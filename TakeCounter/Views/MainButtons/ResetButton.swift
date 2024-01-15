//
//  ResetButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct ResetButton: View {
    var action: () -> Void
    
    var body: some View {
        MainButton(text: "Reset", action: action)
            .background(Color.red)
    }
}

#Preview {
    ResetButton(action: {})
}
