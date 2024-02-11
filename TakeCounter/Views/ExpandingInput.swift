//
//  ExpandingInput.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/29/24.
//

import SwiftUI
import AppKit

var newTimer = {
    Timer.publish(every: 2, on: .main, in: .common).autoconnect()
}

struct ExpandingInput: View {
    let placeholder: String
    @Binding var text: String
    
//    @State var focusTimer = newTimer()
//    @FocusState var focus: Bool
    
    init(_ placeholder: String = "", text: Binding<String>, minWidth: Int = 50) {
        if placeholder.count < minWidth {
            let paddingCount = minWidth - placeholder.count
            let padding = String(repeating: " ", count: paddingCount)
            self.placeholder = placeholder + padding
        } else {
            self.placeholder = placeholder
        }
        
        self._text = text
//        focus = false
    }
    
    var body: some View {
        VStack {
            TextField(placeholder, text: $text)
//            TextField(placeholder, text: $text, onCommit: {
//                focus = false
//            })
//            .onChange(of: text, {
//                focusTimer.upstream.connect().cancel()
//                focusTimer = newTimer()
//            })
//            .onReceive(focusTimer, perform: { _ in
//                focus = false
//            })
//            .focused($focus)
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

struct RemoveFocusModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .onTapGesture {
                DispatchQueue.main.async {
                    NSApp.keyWindow?.makeFirstResponder(nil)
                }
            }
    }
}

extension View {
    func removeFocusOnTap() -> some View {
        modifier(RemoveFocusModifier())
    }
}

#Preview {
    @State var someText: String = ""
    return VStack {
        Text("Example expanding input:")
            .padding()
        ExpandingInput("Placeholder", text: $someText)
    }
    .removeFocusOnTap()
}
