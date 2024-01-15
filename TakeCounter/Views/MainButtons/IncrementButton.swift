//
//  IncrementButton.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct IncrementButton: View {
    var action: () -> Void
    
    var body: some View {
        MainButton(text: "Increment", action: action)
            .background(Color.blue)
    }
}

#Preview {
    IncrementButton(action: {})
}
