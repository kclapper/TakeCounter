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
    @AppStorage(AppSettings.alwaysOnTop.name) var alwaysOnTop = AppSettings.alwaysOnTop.defaultValue

    var body: some Scene {
        WindowGroup {
            MainView()
                .onAppear {
                    DispatchQueue.main.async {
                        NSApp.keyWindow?.makeFirstResponder(nil)
                    }
                    setWindowLevel()
                }
        }
        .defaultSize(width: defaultWidth, height: defaultHeight)
        .onChange(of: alwaysOnTop) {
            setWindowLevel()
        }
        
        Settings {
            SettingsView()
        }
    }
    
    func setWindowLevel() {
        let level: NSWindow.Level = alwaysOnTop ? .floating : .normal
        
        for window in NSApplication.shared.windows {
            window.level = level
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
