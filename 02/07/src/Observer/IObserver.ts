interface IObserver<T, EventType> {
    update(data: T, eventType: EventType): void;
}

export {
    IObserver,
}