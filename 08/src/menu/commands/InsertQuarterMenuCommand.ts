import { GumballMachine } from "../../GumballMachine";
import { MenuCommand } from "./MenuComand";

class InsertQuarterMenuCommand extends MenuCommand {
    private _machine: GumballMachine;

    constructor(machine: GumballMachine) {
        super(
            'InsertQuarter',
            'Insert a quarter into the machine'
        );
        this._machine = machine;
    }

    doExecute(args: string): void {
        this._machine.insertQuarter();
    }
}

export {
    InsertQuarterMenuCommand,
};