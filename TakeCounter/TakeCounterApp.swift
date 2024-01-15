//
//  TakeCounterApp.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import SwiftUI
import SwiftData

let counter: Counter = SingletonCounter.getInstance()

@main
struct TakeCounterApp: App {
    @State private var count: Count = counter.count
    
    var body: some Scene {
        WindowGroup {
            CounterView(count: $count)
            HStack {
                DecrementButton {
                    counter.decrement()
                }
                ResetButton {
                    counter.reset()
                }
                IncrementButton {
                    counter.increment()
                }
            }
        }
    }
}
