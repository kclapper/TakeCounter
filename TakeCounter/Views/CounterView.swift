//
//  CounterView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct CounterView: View {
    @State var count: Count = 0
    
    var body: some View {
        VStack {
            CountView(count: $count)
            
            HStack {
                DecrementButton {
                    if count > 0 {
                        count -= 1
                    }
                }
                ResetButton {
                    count = 0
                }
                IncrementButton {
                    count += 1
                }
            }
        }
        .padding(10)
    }
}

#Preview {
    CounterView()
}
