//
//  TakeCounterApp.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import SwiftUI
import SwiftData

let defaultWidth = CGFloat(400)
let defaultHeight = CGFloat(150)

@main
struct TakeCounterApp: App {
    
    var body: some Scene {
        WindowGroup {
            ClientDetailView()
            CounterView()
        }
        .defaultSize(width: defaultWidth, height: defaultHeight)
    }
}

#Preview {
    Group {
        ClientDetailView()
        CounterView()
                .frame(width: defaultWidth, height: defaultHeight)
    }
}
