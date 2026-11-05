import { Menu } from "../Menu";
import { MenuCommand } from "./MenuComand";

class HelpMenuCommand extends MenuCommand {
    private _menu: Menu;

    constructor(menu: Menu) {
        super(
            'Help',
            'Display help information about available commands'
        );
        this._menu = menu;
    }

    doExecute(args: string): void {
        console.log('Commands:');
        for (const command of this._menu.getCommands()) {
            console.log(`  ${command.getName()}`);
            console.log(`    ${command.getDescription()}\n`);
        }
    }
}

export {
    HelpMenuCommand,
};