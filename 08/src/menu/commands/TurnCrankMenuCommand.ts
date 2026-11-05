import { GumballMachine } from "../../GumballMachine";
import { MenuCommand } from "./MenuComand";

class TurnCrankMenuCommand extends MenuCommand {
    private _machine: GumballMachine;

    constructor(machine: GumballMachine) {
        super(
            'TurnCrank',
            'Turn the crank to get a gumball'
        );
        this._machine = machine;
    }

    doExecute(args: string): void {
        this._machine.turnCrank();
    }
}

export {
    TurnCrankMenuCommand,
};