//
//  ControlView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/21/24.
//

import SwiftUI

struct ControlView: View {
    @Binding var count: Count
    
    var body: some View {
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
}

#Preview {
    @State var count: Count = 0
    return ControlView(count: $count)
}
