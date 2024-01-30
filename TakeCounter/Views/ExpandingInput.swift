//
//  ExpandingInput.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/29/24.
//

import SwiftUI

struct ExpandingInput: View {
    let placeholder: String
    @Binding var text: String
    
    init(_ placeholder: String = "", text: Binding<String>, minWidth: Int = 50) {
        if placeholder.count < minWidth {
            let paddingCount = minWidth - placeholder.count
            let padding = String(repeating: " ", count: paddingCount)
            self.placeholder = placeholder + padding
        } else {
            self.placeholder = placeholder
        }
        
        self._text = text
    }
    
    var body: some View {
        VStack {
            TextField(placeholder, text: $text)
                .textFieldStyle(.plain)
                .foregroundColor(.white)
            Divider()
                .frame(height: 1)
                .background(.white)
        }
        .fixedSize()
        .padding()
    }
}

#Preview {
    @State var someText: String = ""
    return ExpandingInput("Placeholder", text: $someText)
}
