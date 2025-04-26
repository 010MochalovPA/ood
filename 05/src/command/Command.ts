import { ICommand } from "./ICommand";

abstract class Command implements ICommand {
    execute(): void {
        this.doExecute();
    }

    abstract doExecute(): void;
}

export {
    Command,
}