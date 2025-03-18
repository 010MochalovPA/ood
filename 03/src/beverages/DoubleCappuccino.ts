import { DoublePortionStrategy } from "../strategies/PortionSizeStrategy";
import { Cappuccino } from "./Cappuccino";

class DoubleCappuccino extends Cappuccino {
    constructor() {
        super(new DoublePortionStrategy());
    }
}

export {
    DoubleCappuccino,
};