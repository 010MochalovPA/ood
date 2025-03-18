import { IBeverageStrategy } from "./IBeverageStrategy";

class StandardPortionStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Standard";
    }

    getCost(): number {
        return 0;
    }
}

class DoublePortionStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Double";
    }

    getCost(): number {
        return 40;
    }
}

export {
    StandardPortionStrategy,
    DoublePortionStrategy,
};