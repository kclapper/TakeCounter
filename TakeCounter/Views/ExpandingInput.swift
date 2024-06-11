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
    let underlined: Bool
    
    @Binding var text: String
    @State var textSize: CGSize
    
    init(_ placeholder: String = "", text: Binding<String>, minWidth: Int = 50, underlined: Bool = true) {
        if placeholder.count < minWidth {
            let paddingCount = minWidth - placeholder.count
            let padding = String(repeating: " ", count: paddingCount)
            self.placeholder = placeholder + padding
        } else {
            self.placeholder = placeholder
        }
        
        self._text = text
        self.textSize = CGSize(width: 0, height: 0)
        
        self.underlined = underlined
    }
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            HStack {
                Text(text == "" ? placeholder : text)
                        .frame(height: 1)
                        .fixedSize()
                        .background(
                            GeometryReader { proxy in
                                Color.clear
                                    .onAppear {
                                        textSize = proxy.size
                                    }
                                    .onChange(of: text) {
                                        textSize = proxy.size
                                    }
                            }
                        )
            }
            .hidden()

            HStack {
                VStack {
                    TextField(placeholder, text: $text)
                        .textFieldStyle(.plain)

                    if underlined {
                        Divider()
                            .frame(height: 1)
                    }
                }
                .frame(width: textSize.width + 20)
            }
        }
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
        Text("Example expanding input: (Not actually expanding due to weird binding issue, but works in practice)")
            .padding()
        ExpandingInput("Placeholder", text: $someText)
    }
    .removeFocusOnTap()
}
