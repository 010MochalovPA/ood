import { GumballMachine } from "../../GumballMachine";
import { MenuCommand } from "./MenuComand";

class StatusMenuCommand extends MenuCommand {
    private _machine: GumballMachine;

    constructor(machine: GumballMachine) {
        super(
            'Status',
            'Show current machine status and inventory'
        );
        this._machine = machine;
    }

    doExecute(args: string): void {
        console.log(this._machine.toString());
    }
}

export {
    StatusMenuCommand,
};