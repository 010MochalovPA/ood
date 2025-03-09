import { IObserver } from "./IObserver";

interface IObservable<T, EventType> {
    registerObserver(observer: IObserver<T, EventType>, eventType: EventType, priority: number): void;
    removeObserver(observer: IObserver<T, EventType>, eventType: EventType): void;
    notifyObservers(eventType: EventType): void;
}

export {
    IObservable,
}