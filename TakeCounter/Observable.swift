//
//  Observable.swift
//  TakeCounter
//
//  Created by Kyle Clapper on 1/15/24.
//

import Foundation

//protocol Listener: Equatable {
//    associatedtype Event
//    func update(_ event: Event) -> Void
//}
//
//protocol Observable {
//    associatedtype Event
//    associatedtype EventListener: Listener where EventListener.Event == Event
//    
//    var listeners: [EventListener] { get set }
//}
//
//extension Observable {
//    mutating func addListener(listener: EventListener) -> Void {
//        listeners.append(listener)
//    }
//    mutating func removeListener(listener: EventListener) -> Void {
//        listeners.removeAll(where: { $0 == listener })
//    }
//    func updateListeners(event: Event) -> Void {
//        for listener in listeners {
//            listener.update(event)
//        }
//    }
//}
