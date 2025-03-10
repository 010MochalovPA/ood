import { IObservable } from "./IObservable";
import { IObserver } from "./IObserver";

abstract class Observable<T> implements IObservable<T> {
    private _observers: IObserver<T>[] = [];

    public registerObserver(observer: IObserver<T>): void {
        if (!this._observers.some(o => o === observer)) {
            this._observers.push(observer);
        }
    }

    public removeObserver(observer: IObserver<T>): void {
        this._observers = this._observers.filter(o => o !== observer);
    }

    public notifyObservers(): void {
        const data = this._getChangedData();
        this._observers.forEach(observer => observer.update(data));
    }

    protected abstract _getChangedData(): T;
}

export { Observable };