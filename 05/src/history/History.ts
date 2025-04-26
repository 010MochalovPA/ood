import { IUnexecutableCommand } from "../command/IUnexecutableCommand"

class History {
    private _commands: IUnexecutableCommand[] = [];
    private _position: number = -1;

    addAndExecuteCommand(command: IUnexecutableCommand) {
        if (this._shouldClearRedoCommands()) {
            this._clearRedoCommands();
        }

        if (this._isHistoryFull()) {
            this._trimOldestCommand();
        }

        if (this._tryCompoundWithLast(command)) {
            command.execute()
            return;
        }

        this._commands.push(command);
        this._position++;

        this._commands[this._position].execute();
    }

    undo() {
        if (this.canUndo()) {
            this._commands[this._position].unexecute();
            this._position--;
        }
    }

    redo() {
        if (this.canRedo()) {
            this._position++;
            this._commands[this._position].execute();
        }

        return false;
    }

    canUndo(): boolean {
        return this._position >= 0;
    }

    canRedo(): boolean {
        return this._position < this._commands.length - 1;
    }

    private _shouldClearRedoCommands(): boolean {
        return this._position < this._commands.length - 1;
    }

    private _clearRedoCommands() {
        this._commands = this._commands.slice(0, this._position + 1);
    }

    private _isHistoryFull(): boolean {
        return this._commands.length >= 100;
    }

    private _trimOldestCommand() {
        this._commands.shift();
        this._position--;
    }

    private _tryCompoundWithLast(command: IUnexecutableCommand): boolean {
        if (this._position < 0) {
            return false;
        }

        const lastCommand = this._commands[this._position];
        return lastCommand.compoundWith(command);
    }
}

export {
    History,
}