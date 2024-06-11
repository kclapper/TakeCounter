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
        ZStack {
            VStack {
                ClientDetailView()
                Spacer()
            }
            VStack {
                Spacer()
                ControlView(count: $count)
                    .padding(.bottom, 20)
            }
            VStack {
                Spacer()
                CountView(count: $count)
                Spacer()
            }
        }
        .customFont()
        .padding(2)
        .background(Color("BackgroundColor"))
        .removeFocusOnTap()
    }
}

#Preview {
    MainView()
}
