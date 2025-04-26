import { MenuItem } from "../types";

class Menu {
    private _commands: Map<string, MenuItem>;

    constructor(commands: Map<string, MenuItem>) {
        this._commands = commands;
    }

    executeCommand(command: string, params: string = ""): void {
        const item = this._getCommand(command);

        if (!item) {
            console.log(`Command "${command}" not found`);
            return;
        }

        item.createCommand(params).execute();
    }

    getCommands(): Map<string, MenuItem> {
        return this._commands;
    }

    private _getCommand(command: string): MenuItem {
        return this._commands.get(command);
    }
}

export {
    Menu,
}