import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

class Cinnamon extends CondimentDecorator {
    constructor(beverage: IBeverage) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return "Cinnamon";
    }

    protected _getCondimentCost(): number {
        return 20;
    }
}

export {
    Cinnamon,
};