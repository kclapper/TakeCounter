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
        TextField("", text: $clientDetails)
            .underline()
            .padding()
    }
}

#Preview {
    ClientDetailView()
        .padding()
}
