import { IGumballMachine, IState } from "../types";

class SoldOutState implements IState {
    constructor(private gumballMachine: IGumballMachine) { }

    insertQuarter(): void {
        console.log("You can't insert a quarter, the machine is sold out");
    }

    ejectQuarter(): void {
        console.log("You can't eject, you haven't inserted a quarter yet");
    }

    turnCrank(): void {
        console.log("You turned but there's no gumballs");
    }

    dispense(): void {
        console.log("No gumball dispensed");
    }

    toString(): string {
        return "sold out";
    }
}

export {
    SoldOutState,
}