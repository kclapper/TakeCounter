//
//  CounterView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import Foundation
import SwiftUI
import SwiftData

struct CounterView: View {
    @Binding var count: Count

    var body: some View {
        Text("\(count)")
            .font(.largeTitle)
            .bold()
            .padding()
    }
}

#Preview {
    @State var count: Count = 5000
    
    return CounterView(count: $count)
}
