import { IObservable } from "./IObservable";
import { IObserver } from "./IObserver";

abstract class Observable<T> implements IObservable<T> {
    private _observers: Map<number, Set<IObserver<T>>> = new Map();
    private _observerPriorities: Map<IObserver<T>, number> = new Map();

    public registerObserver(observer: IObserver<T>, priority: number): void {
        this.removeObserver(observer);

        if (!this._observers.has(priority)) {
            this._observers.set(priority, new Set());
        }

        const prioritySet = this._observers.get(priority)!;
        
        if (!prioritySet.has(observer)) {
            prioritySet.add(observer);
            this._observerPriorities.set(observer, priority);
        }
    }

    public removeObserver(observer: IObserver<T>): void {
        const priority = this._observerPriorities.get(observer);
        if (priority !== undefined) {
            const prioritySet = this._observers.get(priority);
            
            if (prioritySet) {
                prioritySet.delete(observer);
                if (prioritySet.size === 0) {
                    this._observers.delete(priority);
                }
            }
            
            this._observerPriorities.delete(observer);
        }
    }

    public notifyObservers(): void {
        const data = this._getChangedData();
        const sortedPriorities = Array.from(this._observers.keys()).sort((a, b) => b - a);
        
        for (const priority of sortedPriorities) {
            const observers = this._observers.get(priority)!;
            
            for (const observer of observers) {
                observer.update(data);
            }
        }
    }

    protected abstract _getChangedData(): T;
}

export { Observable };