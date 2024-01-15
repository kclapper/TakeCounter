//
//  PersistentCount.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import Foundation
import SwiftData

@Model
final class PersistentCount: Store {
    var count: Count
    
    init(count: Count) {
        self.count = count
    }
    
    func saveCount(_ count: Count) {
        self.count = count
    }
}
