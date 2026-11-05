import { IGumballMachine, IState } from "../types";

class HasQuarterState implements IState {
    constructor(private gumballMachine: IGumballMachine) { }

    insertQuarter(): void {
        console.log("You can't insert another quarter");
    }

    ejectQuarter(): void {
        console.log("Quarter returned");
        this.gumballMachine.setNoQuarterState();
    }

    turnCrank(): void {
        console.log("You turned...");
        this.gumballMachine.setSoldState();
    }

    dispense(): void {
        console.log("No gumball dispensed");
    }

    toString(): string {
        return "waiting for turn of crank";
    }
}

export {
    HasQuarterState,
}