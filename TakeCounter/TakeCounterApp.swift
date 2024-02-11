//
//  TakeCounterApp.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import SwiftUI
import SwiftData
import AppKit

let defaultWidth = CGFloat(550)
let defaultHeight = CGFloat(250)

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
            .background(.background)
            .removeFocusOnTap()
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
            .background(.background)
            .removeFocusOnTap()
    }
}
