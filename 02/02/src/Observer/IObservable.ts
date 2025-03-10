import { IObserver } from "./IObserver";

interface IObservable<T> {
    registerObserver(observer: IObserver<T>): void;
    removeObserver(observer: IObserver<T>): void;
    notifyObservers(): void;
}

export {
    IObservable,
}