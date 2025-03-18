import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

class Lemon extends CondimentDecorator {
    constructor(beverage: IBeverage, private _quantity: number = 1) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return `Lemon x ${this._quantity}`;
    }

    protected _getCondimentCost(): number {
        return 10 * this._quantity;
    }
}

export {
    Lemon,
};