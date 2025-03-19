import { IBeverageStrategy } from "../strategies/IBeverageStrategy";
import { StandardPortionStrategy } from "../strategies/PortionSizeStrategy";
import { Coffee } from "./Coffee";

class Cappuccino extends Coffee {
    constructor(private _sizeStrategy: IBeverageStrategy = new StandardPortionStrategy()) {
        super(`Cappuccino (${_sizeStrategy.getDescription()})`);
    }

    public getCost(): number {
        return 80 + this._sizeStrategy.getCost();
    }
}

export {
    Cappuccino,
};