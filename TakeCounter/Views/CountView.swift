//
//  CountView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import Foundation
import SwiftUI
import SwiftData

struct CountView: View {
    @Binding var count: Count
    @State var displayText: String
    
    init(count: Binding<Count>) {
        self._count = count
        self.displayText = "\(count.wrappedValue)"
    }

    var body: some View {
        HStack{
            Spacer()
            ExpandingInput(displayText, text: $displayText, minWidth: 0, underlined: false)
                .customFont(.regular, size: 100)
                .foregroundStyle(.white)
                .onChange(of: displayText, parseInputText)
                .onChange(of: count, displayCount)
                .offset(x: 8)
            Spacer()
        }
        .padding(.vertical, -30)
        .background(Color("BackgroundColor"))
    }
    
    func displayCount() {
        displayText = "\(count)"
    }
    
    func parseInputText() {
        if let parsedCount = UInt(displayText) {
            count = parsedCount
        } else if displayText != "" {
            displayCount()
        }
    }
}

#Preview {
    @State var count: Count = 5000
    
    return CountView(count: $count)
}
