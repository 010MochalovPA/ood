import { Command } from "../../command/Command";
import { MenuItem } from "../../types";

class HelpApplicationCommand extends Command {
    private _commands: Map<string, MenuItem>;
    
    constructor(commands: Map<string, MenuItem>) {
        super();

        this._commands = commands;
    }

    doExecute(): void {
        this._commands.forEach((item, key) => {
            console.log(`- ${key}`);
            console.log(item.description);
        })
    }
}

export {
    HelpApplicationCommand,
}