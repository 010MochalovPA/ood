import { IUnexecutableCommand } from "../command/IUnexecutableCommand";

const HISTORY_LIMIT = 10;

class History {
    private _undos: IUnexecutableCommand[] = [];
    private _redos: IUnexecutableCommand[] = [];

    addAndExecuteCommand(command: IUnexecutableCommand): void {
        if (!this._tryMergeWithLastUndo(command)) {
            this._pushUndo(command);
        }

        this._clearRedoBranch();
        command.execute();
    }

    undo(): void {
        const command = this._undos.pop();
        if (command === undefined) {
            return;
        }

        command.unexecute();
        this._redos.push(command);
    }

    redo(): void {
        const command = this._redos.pop();
        if (command === undefined) {
            return;
        }

        command.execute();
        this._undos.push(command);
    }

    canUndo(): boolean {
        return this._undos.length > 0;
    }

    canRedo(): boolean {
        return this._redos.length > 0;
    }

    private _tryMergeWithLastUndo(command: IUnexecutableCommand): boolean {
        if (this.canRedo()) {
            return false;
        }

        const top = this._undos[this._undos.length - 1];
        
        if (top === undefined) {
            return false;
        }

        return top.tryMerge(command);
    }

    private _pushUndo(command: IUnexecutableCommand): void {
        this._undos.push(command);

        if (this._undos.length > HISTORY_LIMIT) {
            const dropped = this._undos.shift();
            dropped?.discard();
        }
    }

    private _clearRedoBranch(): void {
        for (const command of this._redos) {
            command.discard();
        }

        this._redos.length = 0;
    }
}

export {
    History,
};