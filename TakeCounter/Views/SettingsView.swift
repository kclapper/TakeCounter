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
    
    var body: some View {
        Form {
            Toggle("Always on top", isOn: $alwaysOnTop)
            
            Text("Keyboard Shortcuts")
                .font(.title)
            TextField("Increment", text: $incrementShortcut)
        }
        .padding()
    }
}

enum AppSettings {
    static let alwaysOnTop = AppSettingDetail("alwaysOnTop", false)
    static let incrementShortcut = AppSettingDetail("incrementShortcut", "+")
    static let decrementShortcut = AppSettingDetail("decrementShortcut", "-")
    static let resetShortcut = AppSettingDetail("decrementShortcut", "0")
}

struct AppSettingDetail<T> {
    let name: String
    let defaultValue: T
    
    init(_ name: String, _ defaultValue: T) {
        self.name = name
        self.defaultValue = defaultValue
    }
}

func makeShortcut(fromString: String) -> KeyEquivalent {
    return KeyEquivalent(Character(fromString))
}

#Preview {
    SettingsView()
}
