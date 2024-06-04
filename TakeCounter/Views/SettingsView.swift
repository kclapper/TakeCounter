//
//  SettingsView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 2/11/24.
//

import SwiftUI

struct SettingsView: View {
    @AppStorage(AppSettings.alwaysOnTop.name) private var alwaysOnTop = AppSettings.alwaysOnTop.defaultValue
    
    @AppStorage(AppSettings.incrementShortcut.name) private var incrementShortcut = AppSettings.incrementShortcut.defaultValue
    @AppStorage(AppSettings.decrementShortcut.name) private var decrementShortcut = AppSettings.decrementShortcut.defaultValue
    @AppStorage(AppSettings.resetShortcut.name) private var resetShortcut = AppSettings.resetShortcut.defaultValue

    var body: some View {
        Form {
            Toggle("Always on top", isOn: $alwaysOnTop)
            
            Text("Keyboard Shortcuts")
                .font(.title)
            TextField("Increment", text: $incrementShortcut)
            TextField("Decrement", text: $decrementShortcut)
            TextField("Reset", text: $resetShortcut)
        }
        .padding()
    }
}

enum AppSettings {
    static let alwaysOnTop = AppSettingDetail("alwaysOnTop", false)
    static let incrementShortcut = AppSettingDetail("incrementShortcut", "+")
    static let decrementShortcut = AppSettingDetail("decrementShortcut", "-")
    static let resetShortcut = AppSettingDetail("resetShortcut", "0")
}

struct AppSettingDetail<T> {
    let name: String
    let defaultValue: T
    
    init(_ name: String, _ defaultValue: T) {
        self.name = name
        self.defaultValue = defaultValue
    }
}

func makeShortcut(fromString: String) -> KeyEquivalent? {
    if (fromString == "") {
        return nil
    }
    return KeyEquivalent(Character(fromString))
}

#Preview {
    SettingsView()
}
