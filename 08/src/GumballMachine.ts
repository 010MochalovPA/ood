import { HasQuarterState } from "./states/HasQuarterState";
import { NoQuarterState } from "./states/NoQuarterState";
import { SoldOutState } from "./states/SoldOutState";
import { SoldState } from "./states/SoldState";
import { IState, IGumballMachine } from "./types";

class GumballMachine implements IGumballMachine {
    private count: number;
    private currentState: IState;

    private readonly soldOutState: IState;
    private readonly noQuarterState: IState;
    private readonly hasQuarterState: IState;
    private readonly soldState: IState;

    constructor(numBalls: number) {
        this.count = numBalls;

        this.soldOutState = new SoldOutState(this);
        this.noQuarterState = new NoQuarterState(this);
        this.hasQuarterState = new HasQuarterState(this);
        this.soldState = new SoldState(this);

        if (this.count > 0) {
            this.currentState = this.noQuarterState;
        } else {
            this.currentState = this.soldOutState;
        }
    }

    insertQuarter(): void {
        this.currentState.insertQuarter();
    }

    ejectQuarter(): void {
        this.currentState.ejectQuarter();
    }

    turnCrank(): void {
        this.currentState.turnCrank();
        this.currentState.dispense();
    }

    toString(): string {
        return `Count: ${this.count}, State: ${this.currentState.toString()}`;
    }
    releaseBall(): void {
        if (this.count > 0) {
            console.log("A gumball comes rolling out the slot...");
            this.count--;
        }
    }

    getBallCount(): number {
        return this.count;
    }

    setSoldOutState(): void {
        this.currentState = this.soldOutState;
    }

    setNoQuarterState(): void {
        this.currentState = this.noQuarterState;
    }

    setSoldState(): void {
        this.currentState = this.soldState;
    }

    setHasQuarterState(): void {
        this.currentState = this.hasQuarterState;
    }

    refill(numBalls: number): void {
        if (this.currentState === this.soldState) {
            console.log("Can't refill while dispensing a gumball");
            return;
        }

        this.count += numBalls;
        console.log(`Added ${numBalls} gumballs. Total inventory: ${this.count}`);

        if (this.currentState === this.soldOutState) {
            this.setNoQuarterState();
        }
    }
}

export {
    GumballMachine,
};