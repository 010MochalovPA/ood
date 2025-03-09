interface IObserver<T> {
    update(data: T): void;
}

export {
    IObserver,
}