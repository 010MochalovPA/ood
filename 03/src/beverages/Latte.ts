import { IBeverageStrategy } from "../strategies/IBeverageStrategy";
import { StandardPortionStrategy } from "../strategies/PortionSizeStrategy";
import { Coffee } from "./Coffee";

class Latte extends Coffee {
    constructor(private _sizeStrategy: IBeverageStrategy = new StandardPortionStrategy()) {
        super(`Latte (${_sizeStrategy.getDescription()})`);
    }

    public getCost(): number {
        return 90 + this._sizeStrategy.getCost();
    }
}

export {
    Latte,
};