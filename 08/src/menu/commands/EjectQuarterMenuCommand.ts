import { GumballMachine } from "../../GumballMachine";
import { MenuCommand } from "./MenuComand";

class EjectQuarterMenuCommand extends MenuCommand {
    private _machine: GumballMachine;

    constructor(machine: GumballMachine) {
        super(
            'EjectQuarter',
            'Return the inserted quarter'
        );
        this._machine = machine;
    }

    doExecute(args: string): void {
        this._machine.ejectQuarter();
    }
}

export {
    EjectQuarterMenuCommand,
};