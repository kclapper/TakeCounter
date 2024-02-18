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
            MainView()
        }
        .defaultSize(width: defaultWidth, height: defaultHeight)
        
        Settings {
            SettingsView()
        }
    }
}

#Preview {
    Group {
        MainView()
            .frame(width: defaultWidth, height: defaultHeight)
            .background(.gray)
            .removeFocusOnTap()
    }
}
