import { ICommand } from "./ICommand";

abstract class UnexecutableCommand implements ICommand {
    private _executed: boolean = false;

    execute(): void {
        if (this._executed) {
            return;
        }

        this.doExecute();
        this._executed = true;
    }

    unexecute(): void {
        if (!this._executed) {
            return;
        }
        
        this.doUnexecute();
        this._executed = false;
    }

    abstract doExecute(): void;
    abstract doUnexecute(): void;
    abstract compoundWith(command: ICommand): boolean;
}

export {
    UnexecutableCommand,
}