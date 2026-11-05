import { GumballMachine } from "../../GumballMachine";
import { MenuCommand } from "./MenuComand";

class RefillMenuCommand extends MenuCommand {
    private _machine: GumballMachine;

    constructor(machine: GumballMachine) {
        super(
            'Refill',
            'Refill the machine with gumballs (usage: Refill <count>)'
        );
        this._machine = machine;
    }

    doExecute(args: string): void {
        const count = parseInt(args, 10);
        if (isNaN(count) || count <= 0) {
            console.log("Please enter a valid positive number for refill.");
            return;
        }
        this._machine.refill(count);
    }
}

export {
    RefillMenuCommand,
};