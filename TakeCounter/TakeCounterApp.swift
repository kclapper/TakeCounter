//
//  TakeCounterApp.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import SwiftUI
import SwiftData

let defaultWidth = CGFloat(550)
let defaultHeight = CGFloat(200)

@main
struct TakeCounterApp: App {
    
    var body: some Scene {
        WindowGroup {
            VStack {
                HStack {
                    ClientDetailView()
                    Spacer()
                }
                Spacer()
                CounterView()
            }
            .padding()
        }
        .defaultSize(width: defaultWidth, height: defaultHeight)
    }
}

#Preview {
    Group {
        VStack {
            HStack {
                ClientDetailView()
                Spacer()
            }
            Spacer()
            CounterView()
        }
            .frame(width: defaultWidth, height: defaultHeight)
    }
}
