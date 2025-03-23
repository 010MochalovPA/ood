import { IBeverageStrategy } from "./IBeverageStrategy";

abstract class BeverageStrategy implements IBeverageStrategy {
    #cost: number;

    constructor(cost: number) {
        this.#cost = cost;
    }

    getCost(): number {
        return this.#cost;
    };

    abstract getDescription(): string;
}

export {
    BeverageStrategy,
};