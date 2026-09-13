interface ICommand<T = void> {
    execute(args?: T): void;
}

export {
    ICommand,
}