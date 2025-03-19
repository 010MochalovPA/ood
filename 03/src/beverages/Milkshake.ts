import { Beverage } from "../Beverage";
import { IBeverageStrategy } from "../strategies/IBeverageStrategy";
import { SmallMilkshakeStrategy } from "../strategies/MilkshakeSizeStrategy";

class Milkshake extends Beverage {
    constructor(private _sizeStrategy: IBeverageStrategy = new SmallMilkshakeStrategy()) {
        super(`Milkshake (${_sizeStrategy.getDescription()})`);
    }

    public getCost(): number {
        return 50 + this._sizeStrategy.getCost();
    }
}

export {
    Milkshake,
};