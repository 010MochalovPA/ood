interface IState {
    insertQuarter(): void;
    ejectQuarter(): void;
    turnCrank(): void;
    dispense(): void;
    toString(): string;
}

interface IGumballMachine {
    releaseBall(): void;
    getBallCount(): number;
    setSoldOutState(): void;
    setNoQuarterState(): void;
    setSoldState(): void;
    setHasQuarterState(): void;
    refill(numBalls: number): void;
}

export {
    IState,
    IGumballMachine,
}