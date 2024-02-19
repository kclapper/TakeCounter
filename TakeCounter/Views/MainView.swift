//
//  MainView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 2/12/24.
//

import SwiftUI

struct MainView: View {
    @State var count: Count = 0
    
    var body: some View {
        VStack {
            ClientDetailView()
            Spacer()
            CountView(count: $count)
            Spacer()
            ControlView(count: $count)
                .padding(.bottom, 20)
        }
        .padding(2)
        .background(Color("BackgroundColor"))
        .removeFocusOnTap()
    }
}

#Preview {
    MainView()
}
