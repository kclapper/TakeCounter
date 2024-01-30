//
//  ClientDetailView.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/28/24.
//

import SwiftUI

struct ClientDetailView: View {
    @State var clientDetails: String = ""
    
    var body: some View {
        ExpandingInput("", text: $clientDetails)
            .font(.title)
    }
}

#Preview {
    ClientDetailView()
}
