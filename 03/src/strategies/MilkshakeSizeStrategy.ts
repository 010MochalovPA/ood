import { BeverageStrategy } from "./BeverageStrategy";

class SmallMilkshakeStrategy extends BeverageStrategy {
    constructor() {
        super(0);
    }

    getDescription(): string {
        return "Small";
    }
}

class MediumMilkshakeStrategy extends BeverageStrategy {
    constructor() {
        super(10);
    }

    getDescription(): string {
        return "Medium";
    }
}

class LargeMilkshakeStrategy extends BeverageStrategy {
    constructor() {
        super(30);
    }

    getDescription(): string {
        return "Large";
    }
}

export {
    SmallMilkshakeStrategy,
    MediumMilkshakeStrategy,
    LargeMilkshakeStrategy,
}