import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

class Cream extends CondimentDecorator {
    constructor(beverage: IBeverage) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return "Cream";
    }

    protected _getCondimentCost(): number {
        return 25;
    }
}

export {
    Cream,
};