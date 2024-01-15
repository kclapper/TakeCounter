//
//  Counter.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import Foundation

typealias Count = UInt
typealias CountEvent = Count

protocol Listener: AnyObject {
    func update(_ event: CountEvent) -> Void
}

protocol Counter {
    var count: Count { get set }
    
    func increment() -> Void
    func decrement() -> Void
    func reset() -> Void
}

protocol Emitter {
    func addListener(_ listener: Listener) -> Void
    func removeListener(_ listener: Listener) -> Void
    func updateListeners(_ event: CountEvent) -> Void
}

protocol Store {
    func saveCount(_ count: Count) -> Void
}

class SingletonCounter: Counter, Emitter {
    private static var instance: SingletonCounter? = nil
    public static func getInstance() -> SingletonCounter {
        if SingletonCounter.instance == nil {
            SingletonCounter.instance = SingletonCounter()
        }
        return SingletonCounter.instance!
    }
    
    var count: UInt
    var listeners: [any Listener]
    var dataStore: Store?
    
    private init() {
        self.count = 0
        self.listeners = []
    }
    
    func setDataStore(dataStore: Store) {
        self.dataStore = dataStore
    }
    
    func increment() -> Void {
        count += 1
        updateListeners(count)
        
        dataStore?.saveCount(count)
    }
    func decrement() -> Void {
        count -= 1
        updateListeners(count)
        
        dataStore?.saveCount(count)
    }
    func reset() -> Void {
        count = 0
        updateListeners(count)
        dataStore?.saveCount(count)
    }
    
    func addListener(_ listener: any Listener) {
        listeners.append(listener)
    }
    func removeListener(_ listener: any Listener) {
        listeners.removeAll(where: { $0 === listener })
    }
    func updateListeners(_ event: CountEvent) {
        listeners.forEach({ $0.update(event) })
    }
}
