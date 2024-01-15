//
//  DecrementButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct DecrementButton: View {
    var action: () -> Void
    
    var body: some View {
        MainButton(text: "Decrement", action: action)
            .background(Color.blue)
    }
}

#Preview {
    DecrementButton(action: {})
}
