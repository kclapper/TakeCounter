//
//  Font.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 2/18/24.
//

import SwiftUI

enum CustomFontWeight: String {
        case bold = "Avenir-Black"
//        case demibold = "Avenir-Black"
        case medium = "Avenir-Medium"
        case light = "Avenir-Light"
        case heavy = "Avenir-Heavy"
        case regular = "Avenir-Book"
//        case black = "Avenir-Black"
}

enum CustomFontStyle {
    case extraLargeTitle2
    case extraLargeTitle
    case largeTitle
    case title
    case title2
    case title3
    case headline
    case subheadline
    case body
    case callout
    case caption
    case caption2
    case footnote
}

struct CustomFontModifier: ViewModifier {
    @AppStorage("fontSize") private var fontSize: Double = 10
    
    let relativeTo: Font.TextStyle  = .body
    
    let name: CustomFontWeight
    let size: CGFloat
    
    init(_ name: CustomFontWeight, size: CGFloat) {
        self.name = name
        self.size = size
    }
    
    func body(content: Content) -> some View {
        content
            .font(.custom(name.rawValue, size: size + CGFloat(fontSize), relativeTo: relativeTo))
    }
}

extension View {
    func customFont(_ name: CustomFontWeight, size: CGFloat) -> some View {
        modifier(CustomFontModifier(name, size: size))
    }
    
    func customFont() -> some View {
        modifier(CustomFontModifier(.regular, size: CGFloat(10)))
    }
    
    func customFont(size: CGFloat) -> some View {
        modifier(CustomFontModifier(.regular, size: size))
    }
}
