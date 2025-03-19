import { DoublePortionStrategy } from "../strategies/PortionSizeStrategy";
import { Latte } from "./Latte";

class DoubleLatte extends Latte {
    constructor() {
        super(new DoublePortionStrategy());
    }
}

export {
    DoubleLatte,
};