import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

class ChocolateCrumbs extends CondimentDecorator {
    constructor(beverage: IBeverage, private _mass: number) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return `Chocolate crumbs ${this._mass}g`;
    }

    protected _getCondimentCost(): number {
        return 2 * this._mass;
    }
}

export {
    ChocolateCrumbs,
};