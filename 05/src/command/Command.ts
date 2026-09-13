import { ICommand } from "./ICommand";

abstract class Command<T = void> implements ICommand<T> {
    execute(args?: T): void {
        this.doExecute(args);
    }

    abstract doExecute(args?: T): void;
}

export {
    Command,
}