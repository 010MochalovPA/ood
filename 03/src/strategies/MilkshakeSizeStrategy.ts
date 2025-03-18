import { IBeverageStrategy } from "./IBeverageStrategy";

class SmallMilkshakeStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Small";
    }

    getCost(): number {
        return 0;
    }
}

class MediumMilkshakeStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Medium";
    }

    getCost(): number {
        return 10;
    }
}

class LargeMilkshakeStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Large";
    }

    getCost(): number {
        return 30;
    }
}

export {
    SmallMilkshakeStrategy,
    MediumMilkshakeStrategy,
    LargeMilkshakeStrategy,
}