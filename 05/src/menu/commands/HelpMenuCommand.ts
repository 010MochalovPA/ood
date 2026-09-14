import { MenuCommand } from "./MenuCommand";
import { Menu } from "../Menu";

class HelpMenuCommand extends MenuCommand {
    private _menu: Menu;

    constructor(menu: Menu) {
        super(
            'Help',
            'Display help information about available commands',
            'Help'
        );
        this._menu = menu;
    }

    doExecute(args: string): void {
        console.log('');
        console.log('Available commands:');
        console.log('');

        for (const command of this._menu.getCommands()) {
            console.log(`  ${command.getUsage()}`);
            console.log(`    ${command.getDescription()}\n`);
        }
    }
}

export {
    HelpMenuCommand,
}