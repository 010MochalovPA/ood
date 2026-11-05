import { IGumballMachine, IState } from "../types";

class SoldState implements IState {
    constructor(private gumballMachine: IGumballMachine) { }

    insertQuarter(): void {
        console.log("Please wait, we're already giving you a gumball");
    }

    ejectQuarter(): void {
        console.log("Sorry you already turned the crank");
    }

    turnCrank(): void {
        console.log("Turning twice doesn't get you another gumball");
    }

    dispense(): void {
        this.gumballMachine.releaseBall();

        if (this.gumballMachine.getBallCount() === 0) {
            console.log("Oops, out of gumballs");
            this.gumballMachine.setSoldOutState();
        } else {
            this.gumballMachine.setNoQuarterState();
        }
    }

    toString(): string {
        return "delivering a gumball";
    }
}

export {
    SoldState,
}