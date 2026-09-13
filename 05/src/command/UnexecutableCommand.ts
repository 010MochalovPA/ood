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

    tryMerge(command: UnexecutableCommand): boolean {
        return false;
    }
    
    discard(): void {}

    protected abstract doExecute(): void;
    protected abstract doUnexecute(): void;
}

export {
    UnexecutableCommand,
}