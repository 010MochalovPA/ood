import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

class CoconutFlakes extends CondimentDecorator {
    constructor(beverage: IBeverage, private _mass: number) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return `Coconut flakes ${this._mass}g`;
    }

    protected _getCondimentCost(): number {
        return 1 * this._mass;
    }
}

export {
    CoconutFlakes,
};