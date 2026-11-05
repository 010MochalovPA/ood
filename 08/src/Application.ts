import { createInterface } from 'readline';
import { GumballMachine } from './GumballMachine';
import { InsertQuarterMenuCommand } from './menu/commands/InsertQuarterMenuCommand';
import { EjectQuarterMenuCommand } from './menu/commands/EjectQuarterMenuCommand';
import { IMenuCommand } from './menu/types';
import { TurnCrankMenuCommand } from './menu/commands/TurnCrankMenuCommand';
import { RefillMenuCommand } from './menu/commands/RefillMenuCommand';
import { StatusMenuCommand } from './menu/commands/StatusMenuCommand';
import { Menu } from './menu/Menu';


class Application {
    private _machine: GumballMachine;
    private _menu: Menu;
    private _readLine = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Gumball> '
    });

    constructor() {
        this._machine = new GumballMachine(5);

        const commands: IMenuCommand[] = [
            new InsertQuarterMenuCommand(this._machine),
            new EjectQuarterMenuCommand(this._machine),
            new TurnCrankMenuCommand(this._machine),
            new RefillMenuCommand(this._machine),
            new StatusMenuCommand(this._machine),
        ];

        this._menu = new Menu(commands);
    }

    async run() {
        console.log("Gumball Machine");

        this._readLine.prompt();
        this._readLine
            .on('line', (line: string) => {
                try {
                    this._executeLine(line);
                } catch (error) {
                    console.error((error as Error).message);
                }
                this._readLine.prompt();
            })
            .on('close', () => {
                process.exit(0);
            });
    }

    private _executeLine(line: string): void {
        const parsed = this._splitInput(line);
        if (!parsed) {
            return;
        }
        this._menu.executeCommand(parsed.name, parsed.args);
    }

    private _splitInput(input: string): { name: string; args: string } | null {
        const trimmed = input.trim();
        if (!trimmed) {
            return null;
        }
        const parts = trimmed.split(/\s+/);
        const [name, ...argsArray] = parts;
        return {
            name,
            args: argsArray.join(' '),
        };
    }
}

export {
    Application,
};