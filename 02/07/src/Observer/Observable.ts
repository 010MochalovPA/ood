import { IObservable } from "./IObservable";
import { IObserver } from "./IObserver";

type ObserverSet<T, EventType> = Set<IObserver<T, EventType>>;
type PriorityMap<T, EventType> = Map<number, ObserverSet<T, EventType>>;
type EventObserversMap<T, EventType> = Map<EventType, PriorityMap<T, EventType>>;
type ObserverPriorityMap<T, EventType> = Map<IObserver<T, EventType>, Map<EventType, number>>;

abstract class Observable<T, EventType> implements IObservable<T, EventType> {
    private _observers: EventObserversMap<T, EventType> = new Map();
    private _observerPriorities: ObserverPriorityMap<T, EventType> = new Map();

    public registerObserver(observer: IObserver<T, EventType>, eventType: EventType, priority: number): void {
        this.removeObserver(observer, eventType);

        if (!this._observers.has(eventType)) {
            this._observers.set(eventType, new Map());
        }

        const eventObservers = this._observers.get(eventType)!;
        
        if (!eventObservers.has(priority)) {
            eventObservers.set(priority, new Set());
        }

        const prioritySet = eventObservers.get(priority)!;

        if (!prioritySet.has(observer)) {
            prioritySet.add(observer);

            if (!this._observerPriorities.has(observer)) {
                this._observerPriorities.set(observer, new Map());
            }

            this._observerPriorities.get(observer)!.set(eventType, priority);
        }
    }

    public removeObserver(observer: IObserver<T, EventType>, eventType: EventType): void {
        const priorityMap = this._observerPriorities.get(observer);

        if (priorityMap && priorityMap.has(eventType)) {
            const priority = priorityMap.get(eventType);
            const eventObservers = this._observers.get(eventType);
        
            if (eventObservers && priority !== undefined) {
                const prioritySet = eventObservers.get(priority);
                prioritySet?.delete(observer);
        
                if (prioritySet?.size === 0) {
                    eventObservers.delete(priority);
                }
            }

            this._observerPriorities.get(observer)?.delete(eventType);
        }
    }

    public notifyObservers(eventType: EventType): void {
        const observersForEvent = this._observers.get(eventType);
        if (!observersForEvent) {
            return;
        }

        const sortedPriorities = Array.from(observersForEvent.keys()).sort((a, b) => b - a);

        for (const priority of sortedPriorities) {

            const observers = observersForEvent.get(priority)!;

            for (const observer of observers) {
                const data = this._getChangedData();
                observer.update(data, eventType);
            }
        }
    }

    protected abstract _getChangedData(): T;
}


export { Observable };