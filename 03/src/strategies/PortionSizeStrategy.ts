import { BeverageStrategy } from "./BeverageStrategy";

class StandardPortionStrategy extends BeverageStrategy {
    constructor() {
        super(0);
    }

    getDescription(): string {
        return "Standard";
    }
}

class DoublePortionStrategy extends BeverageStrategy {
    constructor() {
        super(40);
    }

    getDescription(): string {
        return "Double";
    }
}

export {
    StandardPortionStrategy,
    DoublePortionStrategy,
};