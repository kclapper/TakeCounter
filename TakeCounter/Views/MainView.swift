//
//  MainView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 2/12/24.
//

import SwiftUI

struct MainView: View {
    var body: some View {
        VStack {
            ClientDetailView()
            Spacer()
            CounterView()
            Label("", systemImage: "gear")
        }
        .padding()
        .background(.gray)
        .removeFocusOnTap()
    }
}

#Preview {
    MainView()
}
