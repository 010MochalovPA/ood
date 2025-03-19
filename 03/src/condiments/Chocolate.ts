import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

class Chocolate extends CondimentDecorator {
    constructor(beverage: IBeverage, private _slices: number) {
        super(beverage);

        if (_slices < 1 || _slices > 5) {
            throw new Error("The number of chocolate slices must be between 1 and 5.");
        }
    }

    protected _getCondimentDescription(): string {
        return `Chocolate x ${this._slices}`;
    }

    protected _getCondimentCost(): number {
        return 10 * this._slices;
    }
}

export {
    Chocolate,
};
