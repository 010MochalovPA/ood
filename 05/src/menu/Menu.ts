import { HelpMenuCommand } from "./commands/HelpMenuCommand";
import { IMenuCommand } from "./commands/IMenuCommand";

class Menu {
    private _commands: IMenuCommand[] = [];

    constructor(commands: IMenuCommand[]) {
        this._commands = [...commands];

        this._commands.push(new HelpMenuCommand(this));
    }

    executeCommand(name: string, args: string): void {
        const command = this._findCommand(name);

        if (!command) {
            throw new Error(`Command "${name}" not found`);
        }

        command.execute(args);
    }

    getCommands(): IMenuCommand[] {
        return this._commands;
    }

    private _findCommand(commandName: string): IMenuCommand | undefined {
        return this._commands.find(cmd => cmd.getName() === commandName);
    }
}

export {
    Menu,
}